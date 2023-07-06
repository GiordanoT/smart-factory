import React from "react";

interface IProps { code: number, name: string, width: number }
export default function MySvg(props: IProps) {
    const code = props.code;
    const name = props.name;
    const width = props.width;

    return (<div className={"d-block mx-auto"}>
        <img src={'https://www.svgrepo.com/show/' + code + '/' + name + '.svg'} width={width} />
    </div>);
}
