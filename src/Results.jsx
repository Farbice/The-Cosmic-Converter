import { useState, useEffect, useRef, useContext } from "react";
import { Context } from "./Utilities/Context";
import { Table } from "./Table";


function Results(props) {

    const { themeColors } = useContext(Context);
    // eslint-disable-next-line react/prop-types
    const { children } = props;




    return (
        <>
            <div className={`flex flex-wrap -mt-10 md:gap-8 justify-center xs:w-3/4 md:w-5/6 lg:w-3/5 mx-auto sm:p-16 p-8 ${themeColors.component.bckgd} ${themeColors.text} shadow-xl shadow-blue-500/20 border-none rounded-3xl`}>
                <div className="block w-full">
                    <div>
                        <ul className="flex gap-8 justify-end">
                            <li className="cursor-pointer">copy</li>
                            <li>|</li>
                            <li className="cursor-pointer">export</li>
                        </ul>
                    </div>
                </div>
                <div className="block">
                    {
                        console.log(children.props.list.values)
                    }
                    {
                        children.props.list.values.map((element, index) => {
                            return <div key={index}>
                                <div values={element}>{element}</div>
                            </div>
                        })
                    }
                    {/* {children.props.list.values[0][0]}
                    {children.props.list.values[1][0]}
                    {children.props.list.values[2][0]}

                    {children.props.list.values[0][1]}
                    {children.props.list.values[1][1]}
                    {children.props.list.values[2][1]} */}
                </div>
            </div>
        </>
    )
}

export default Results;