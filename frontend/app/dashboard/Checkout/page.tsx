import dynamic from "next/dynamic";

const CheckoutClient = dynamic(
  () => import("./checkoutClient"),
  {
    ssr: false,
  }
);

export default function Page() {
  return <CheckoutClient />;
}