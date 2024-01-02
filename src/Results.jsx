import { useContext, useState, useEffect } from "react";
import { Context } from "./Utilities/Context";


function Results(props) {

    const { themeColors, state } = useContext(Context);
    // eslint-disable-next-line react/prop-types
    const { children } = props;

    console.log(themeColors.border.clipping);

    const [numberOfConversions, setNumOfConversions] = useState({
        number: '',
        grammar: 'Conversion'
    });

    useEffect(() => {

        // eslint-disable-next-line react/prop-types
        if (children.props.list.values.length > 1) {
            setNumOfConversions({
                // eslint-disable-next-line react/prop-types
                number: children.props.list.values.length,
                grammar: 'Conversions'
            })
        } else { 
            setNumOfConversions({
                // eslint-disable-next-line react/prop-types
                number: '',
                grammar: 'Conversion'
            })
        }

        // eslint-disable-next-line react/prop-types
    }, [children.props.list.values.length]);


    return (
        <>
            <div className={`flex flex-wrap -mt-10 mb-10 md:gap-8 justify-start xs:w-3/4 md:w-5/6 lg:w-3/5 mx-auto sm:p-16 p-8 ${themeColors.component.bckgd} ${themeColors.text} shadow-xl shadow-blue-500/20 border-none rounded-3xl`}>
                <div className="block w-full">
                    <div className="flex justify-between items-center">
                        <div className="p-8 bg-slate-200 rounded-3xl">

                        </div>
                        <div>
                            <h3 className={`text-4xl font-questrial`}>Your {numberOfConversions.number} Cosmic {numberOfConversions.grammar}</h3>
                        </div>
                    </div>
                </div>
                <div className="relative md:inset-14 inset-6 flex gap-8 items-center">
                    <div className={`inline-block px-14 py-6 ${themeColors.component.input_bg} rounded-xl`}>
                        <ul className={`flex justify-end gap-8 font-light md:text-3xl text-2xl ${themeColors.component.text}`}>
                            <li className="text-[2.60rem] px-4">{state.inputData.amount}</li>
                            <li>|</li>
                            <li>{state.inputData.currency}</li>
                        </ul>
                    </div>
                    <div>
                        <p className={`font-questrial md:text-3xl text-2xl ${themeColors.accent_text}`}>converts to</p>
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex flex-wrap w-full p-8 rounded-3xl border-[1px] border-orange-200">
                        <div className="block w-full">
                            <ul className="flex gap-4 justify-end font-questrial text-[1.2rem] text-slate-300">
                                <li className="cursor-pointer">copy</li>
                                <li>|</li>
                                <li className="cursor-pointer">export</li>
                            </ul>
                        </div>
                        {
                            // eslint-disable-next-line react/prop-types
                            children.props.list && children.props.list.values.map((element, index) => {
                                return (
                                    <div key={index}>
                                        <div className={`flex gap-8 justify-center items-end px-8 py-4 m-4 rounded-xl border-[1px] ${themeColors.border.result}`}>
                                            <div values={element} className={`text-4xl font-light pr-4 ${themeColors.text}`}>
                                                {element[0]}
                                            </div>
                                            <div values={element} className={`text-3xl ${themeColors.text}`}>
                                                {element[1]}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Results;