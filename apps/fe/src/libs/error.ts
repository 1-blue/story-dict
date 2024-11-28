export class APIResponseError extends Error {
  readonly title: string;
  readonly description: string;

  constructor({ title, description }: { title: string; description: string }) {
    super();

    // APIResponseError
    this.title = title;
    this.description = description;
  }
}
