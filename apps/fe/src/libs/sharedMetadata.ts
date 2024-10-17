import type { Metadata } from "next";

const sharedTitle: Metadata["title"] = {
  template: "잡학일지 | %s",
  default: "잡학일지",
};
const sharedDescription = `중요하지는 않지만 알아두면 좋은 잡다한 지식을 공유하는 서비스`;
const sharedKeywords = [
  "잡학",
  "잡다한 지식",
  "상식",
  "어원",
  "순우리말",
  "명대사",
];
const sharedImages = ["/images/default/preview.jpg"];

interface GetSharedMetadataArgs {
  title?: Metadata["title"];
  description?: string;
  keywords?: string[];
  images?: string[];
}

/** 공용으로 사용할 메타데이터 */
export const getSharedMetadata = ({
  title = sharedTitle,
  description = sharedDescription,
  keywords = sharedKeywords,
  images = sharedImages,
}: GetSharedMetadataArgs = {}): Metadata => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_CLIENT_URL),
  title,
  description,
  keywords: [...new Set([...sharedKeywords, ...keywords])],
  openGraph: {
    title: title ?? sharedTitle,
    description,
    images,
    type: "website",
    url: process.env.NEXT_PUBLIC_CLIENT_URL,
    siteName: "중요하지는 않지만 알아두면 좋은 잡다한 지식을 공유하는 서비스",
    locale: "ko_KR",
    countryName: "Korea",
  },
  twitter: {
    card: "summary_large_image",
    title: title ?? sharedTitle,
    description,
    images,
  },
});