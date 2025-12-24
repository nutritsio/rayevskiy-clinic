declare module "vue3-compare-image" {
  import type { DefineComponent } from "vue";

  export const VueCompareImage: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    any
  >;

  const component: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    any
  >;

  export default component;
}

declare module "vue3-compare-image/dist/components/VueCompareImage.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    any
  >;
  export default component;
}
