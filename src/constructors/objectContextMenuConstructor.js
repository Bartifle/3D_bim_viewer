import {
  ContextMenu,
} from "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/xeokit-sdk.es.min.js";

export function objectContextMenuConstructor(propertiesParser){
  const objectContextMenu = new ContextMenu({
    items: [
      [
        {
          title: "Properties",
          doAction: function (context) {
            console.log(context.viewer.metaScene.metaObjects[context.entity.id].propertySets)
            propertiesParser(
              context.viewer.metaScene.metaObjects[context.entity.id].propertySets
            );
          },
        },
      ],
    ],
    enabled: true,
  });

  return objectContextMenu
}