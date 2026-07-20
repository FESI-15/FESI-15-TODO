declare module "*.png" {
  import { StaticImageData } from "next/image";
  const src: StaticImageData;
  export default src;
}
