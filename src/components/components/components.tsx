import { useState } from "react";
import { componentMapping } from "../../utils";
import styles from "./components.module.css";
import { PageData, Variable, Component } from "../../types";

type ComponentsProps = {
    pageData: PageData;
};

type State = {
    [key: string]: string;
};

const Components = ({ pageData }: ComponentsProps) => {
    const [state, setState] = useState(() => {
        let initialState: State = {};

        pageData.variables?.forEach((variable: Variable) => {
            initialState[variable.name] = variable.initialValue;
        });

        return initialState;
    });

    const updateState = (key: string, val: string) => {
        setState((prevState) => ({ ...prevState, [key]: val }));
    };

    const getComponents = (list = pageData.lists[0], components: any = []) => {
        list.components.forEach((componentId) => {
            let component: Component | undefined = pageData.components.find(
                ({ id }) => id === componentId
            );

            if (component && component.type === "condition") {
                if (state[component.options.variable] === component.options.value) {
                    const list = pageData.lists.find(({ id }) => id === component?.children);

                    if (list) getComponents(list, components);
                }
            } else if (component) {
                const Item = componentMapping[component.type];

                components.push(
                    <Item
                        key={component.id}
                        options={component.options}
                        updateState={updateState}
                    />
                );
            }
        });

        return components;
    };

    return <div id={styles.components}>{getComponents()}</div>;
};

export default Components;
