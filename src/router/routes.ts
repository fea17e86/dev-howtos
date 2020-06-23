export namespace AppRoute {
  export function create(selectedTags?: Set<string>, search?: string) {
    return `/dev-howtos?selectedTags=${
      selectedTags ? `${Array.from(selectedTags).join(",")}` : ""
    }&search=${search ?? ""}`;
  }
  export const template = "/dev-howtos";
}
