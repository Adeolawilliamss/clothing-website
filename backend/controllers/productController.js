const multer = require("multer");
const sharp = require("sharp");
const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const cloudinary = require("../config/cloudinary");
const { Readable } = require("stream");

// MEMORY STORAGE for image buffer
const multerStorage = multer.memoryStorage();

// FILTER only images
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! please upload only images.", 400), false);
  }
};

// Multer upload middleware
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Convert buffer to readable stream (for Cloudinary)
const bufferToStream = (buffer) => {
  const readable = new Readable();
  readable._read = () => {};
  readable.push(buffer);
  readable.push(null);
  return readable;
};

// Upload to Cloudinary instead of local file system
exports.uploadProductImage = upload.single("image");

exports.resizeProductImage = catchAsync(
  async (req, res, next) => {
    if (!req.file) return next();

    const buffer = await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toBuffer();

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "products",
        format: "jpeg",
        public_id: `product-${Date.now()}`,
      },
      (error, result) => {
        if (error) {
          return next(
            new AppError(
              "Cloudinary upload failed",
              500
            )
          );
        }

        req.body.image = result.secure_url;

        next();
      }
    );

    bufferToStream(buffer).pipe(stream);
  }
);

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      newProduct,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,           // return updated doc
      runValidators: true, // validate updates
    }
  );

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
