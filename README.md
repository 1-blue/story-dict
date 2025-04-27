## 🔥 프로젝트에 대해
### 📌 프로젝트 목적
`그거 이름이 뭐지?` 혹은 `이 현상에 대한 단어가 뭐지?` 같은 사소한 의문에 대한 답을 줄 수 있는 커뮤니티 서비스<br />
(추가로 사용해보고 싶은 기술들을 써보기 위한 프로젝트)

### 📆 프로젝트 기간
+ ✏️ 개인 프로젝트
+ ⏱️ 프로젝트 기간: `v2` → `2024.10.10 ~ 2025.01.05`
+ 📚 API 문서: [프로젝트 결과물](https://docs.story-dict.com)
+ ⛓️ 배포 링크: [프로젝트 결과물](https://story-dict.com)

### 📝 v2 진행 후 느낀 점
프로젝트를 시작할 때 구체적인 목표를 세우지 않고 사용해보고 싶은 기술이나 써보자는 마음으로 시작했던 프로젝트였어요.
구체적인 기능과 범위, 기간도 정하지 않고 시작하니 하나의 기능을 시작하고 마무리할 때마다 멈칫하는 상황이 생겼어요.
항상 목표를 세우고 목표를 달성하는 것이 중요하다는 것을 느꼈어요.
`v2` 끝났지만 계속 개선해나갈 것이기 때문에 `Jira`를 학습해볼 겸 사용해서 일정관리를 해보려고 해요.

그리고 이번에 처음 해봤던 기술들이 많아요.
`Turborepo`, `Docker`, `AWS로 배포`, `shadcn/ui`, `zod` 모두 프로젝트에서 처음 사용해봤는데 좋은 경험이었어요.
특히 `shadcn/ui`가 엄청 편하고 유용했고, `Turborepo`랑 결합해서 사용하니까 레포랑 패키지가 분리되어서 프로젝트 관리가 편했어요.
또한 `Docker`에 대한 미지의 두려움이 있었는데 막상 사용해보니 생각보다 어렵지 않았고 빌드된 이미지만 배포해서 올리니까 `EC2`에서 받아서 사용하기 너무 편해서 좋았어요.

## 🛠️ 기술 스택
### 🖇️ Common
| `TypeScript` | `Turborepo` | `Docker` | `AWS EC2` | `AWS S3` | `AWS RDS` | `AWS Route 53` |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/typescript/3178C6" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/turborepo/FF4154" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/docker/2496ED" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/amazonec2/FF9900" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/amazons3/569A31" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/amazonrds/5291FF" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/amazonroute53/8C4FFF" alt="icon" width="75" height="75" /></div> |


### 📤 FrontEnd
| `Next.js 14` | `TailwindCss` | `Transtack Query` | `Shadcn/ui` | `React-Hook-Form` | `Zod` |
| :--: | :--: | :--: | :--: | :--: | :--: |
| <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/nextdotjs/000000" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/reactquery/FF4154" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/shadcnui/000000" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/reacthookform/EC5990" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/zod/3E67B1" alt="icon" width="75" height="75" /></div> |

### 📥 BackEnd
| `Nest.js` | `Prisma` |
| :--: | :--: |
| <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/nestjs/E0234E" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/prisma/398739" alt="icon" width="75" height="75" /></div> |

## 📚 문서
### 📕 API 문서
> [Apidog](https://docs.story-dict.com)을 참고

### 📘 프로젝트 문서
> [노션 문서](https://thrilling-mapusaurus-f24.notion.site/story-dict-13ab6aeed401808eb6fccd9ee6f8f0ae?pvs=4)

1. [폴더 구조](https://thrilling-mapusaurus-f24.notion.site/16bb6aeed40180d9a253fc05036d629a)
2. [코딩 컨벤션](https://thrilling-mapusaurus-f24.notion.site/144b6aeed40180b99b7ad0291cb454db)
3. [배포관련](https://www.notion.so/16cb6aeed40180339c5bfca7cd285036)