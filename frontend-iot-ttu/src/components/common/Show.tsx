import React, { FC, ReactElement, ReactNode } from 'react';

type ShowProps = {
    children: ReactNode;
};

type ConditionProps = {
    isTrue: boolean;
    children: ReactNode;
};

type ElseProps = {
    render?: () => ReactNode;
    children: ReactNode;
};

export const Show: FC<ShowProps> & { When: FC<ConditionProps>; Else: FC<ElseProps>; } = (props) => {
    let when: ReactNode = null;
    let otherwise: ReactNode = null;

    React.Children.forEach(props.children, (child: any) => {
        if (child?.props?.isTrue !== undefined) {
            if (child.props.isTrue) when = child;
        } else {
            otherwise = child;
        }
    });

    return <>{when || otherwise}</>;
};

Show.When = ({ isTrue, children }: ConditionProps): JSX.Element => <>{isTrue ? children : null}</>;

Show.Else = ({ render = () => null, children }: ElseProps): JSX.Element => <>{render() ?? children}</>;

export default Show;