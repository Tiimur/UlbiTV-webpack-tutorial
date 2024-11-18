// Работа с синтаксической картой модуля, https://astexplorer.net/

import { PluginItem } from "@babel/core";

export function removeDataTestIdBabelPlugin(): PluginItem {
    return {
        visitor: {
            Program(path, state) {
                const forbiddenProp = state.opts.props || [ ]; // получаем переданные свойства (props`ы), которые должны быть удалены: data-test...

                path.traverse({ // в функции ищем нужный узел (node), в данном случае идентификатор JSX
                    JSXIdentifier(current) {
                        const nodeName = current.node.name;
                        if (forbiddenProp.includes(nodeName)) { // если имя узла находится в списке запрещеннёх свойств
                            current.parentPath.remove();
                        }
                    }
                });
            }
        }
    }
}