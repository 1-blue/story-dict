import type { Metadata } from "next";

const sharedTitle: Metadata["title"] = {
  template: "잡학일지 | %s",
  default: "잡학일지",
};
const sharedDescription = `그거 뭐지?\n이 행위나 현상을 의미하는 단어는 뭐지?\n뜻, 의미, 어원, 예시, 예문 등을 알려주는 서비스\n중요하지는 않지만 알아두면 좋은 잡다한 지식을 공유하는 서비스`;
const sharedKeywords = [
  "잡학",
  "잡다한 지식",
  "상식",
  "어원",
  "순우리말",
  "명대사",
  "의미",
  "뜻",
];
const sharedImages = ["/images/default/preview.jpg"];
const getSharedKeywords = (title: string) => [
  `${title} 뜻`,
  `${title} 어원`,
  `${title} 의미`,
  `${title} 예시`,
  `${title} 예문`,
  `${title}이란`,
];

interface IGetSharedMetadataArgs {
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
}: IGetSharedMetadataArgs = {}): Metadata => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_CLIENT_URL),
  title,
  description,
  keywords: [
    ...new Set([
      ...sharedKeywords,
      ...getSharedKeywords(String(title)),
      ...keywords,
    ]),
  ],
  openGraph: {
    title: title ?? sharedTitle,
    description,
    images,
    type: "website",
    url: process.env.NEXT_PUBLIC_CLIENT_URL,
    siteName: sharedDescription,
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
