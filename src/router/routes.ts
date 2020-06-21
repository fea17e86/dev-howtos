export namespace AppRoute {
  export function create(selectedTags?: Set<string>) {
    return `/dev-howtos?selectedTags=${
      selectedTags ? `${Array.from(selectedTags).join(",")}` : ""
    }`;
  }
  export const template = "/dev-howtos";
}
