import { useContext, useState, useEffect, useRef } from "react";
import { Context } from "./Utilities/Context";
import StarResLeft from "./Assets/Images/star_res_left";
import LogoDark from "./Assets/Logo/logoDark";
import LogoLight from "./Assets/Logo/logoLight";


function Results(props) {

    const { themeColors, state } = useContext(Context);
    // eslint-disable-next-line react/prop-types
    const { children } = props;

    const [numberOfConversions, setNumOfConversions] = useState({
        number: '',
        grammar: 'Conversion'
    });

    const targetComponentRef = useRef();

    const [expandable, setExpandable] = useState(false);

    useEffect(() => {

        // eslint-disable-next-line react/prop-types
        if (children.props.list.values.length >= 1) {
            setNumOfConversions({
                // eslint-disable-next-line react/prop-types
                number: children.props.list.values.length,
                grammar: 'Conversions'
            })
            setExpandable(true);

        } else {
            setNumOfConversions({
                // eslint-disable-next-line react/prop-types
                number: '',
                grammar: 'Conversion'
            })
        }

        // eslint-disable-next-line react/prop-types
    }, [children.props.list.values.length]);


    useEffect(() => {
        // eslint-disable-next-line react/prop-types
        if (children.props.list) {
            setTimeout(() => {
                autoFocus(targetComponentRef);
            }, 50);
        }

    // eslint-disable-next-line react/prop-types
    }, [children.props.list]);

    const autoFocus = (element) => element.current?.scrollIntoView({behavior: "smooth"});

    return (
        <>
            <div className={`flex flex-wrap ${expandable ? 'h-full overflow-y-visible' : 'h-0 overflow-y-clip'} -mt-10 mb-10 md:gap-8 justify-start w-4/5 xs:w-3/4 md:w-5/6 lg:w-3/5 mx-auto sm:p-16 p-8 ${themeColors.component.bckgd} ${themeColors.text} shadow-xl shadow-blue-500/20 border-none rounded-3xl transition-all duration-300`}>
                <div className="block w-full text-center">
                    <div className="flex sm:justify-between justify-center items-center mb-6">
                        <div className="hidden sm:block p-[1.4rem] rounded-full scale-75">
                            {
                                (state.currentTheme === 'light') && <LogoDark />
                            }
                            {
                                (state.currentTheme === 'dark') && <LogoLight />
                            }
                        </div>
                        <div className="my-6">
                            <h3 className={`text-4xl xxs:mx-auto mx-[1rem] font-questrial ${themeColors.component.text}`}>
                                <span className={`relative xxs:inline-block md:-left-8 md:-top-0 xxs:-left-[1.8rem] xxs:top-[0.2rem] md:scale-100 scale-70 w-8 h-8 hidden`}>
                                    <StarResLeft />
                                </span>
                                <span className="xxs:inline inline-block xxs:w-full w-80">
                                    Your {numberOfConversions.number} Cosmic {numberOfConversions.grammar}
                                </span>
                                <span className={`relative xxs:inline-block md:-left-3 md:-top-7 xxs:-left-[0.8rem] xxs:-top-[1.8rem] md:scale-80 scale-75 w-8 h-8 hidden`}>
                                    <StarResLeft />
                                </span>
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="relative md:inset-14 inset-6 flex gap-8 items-center max-w-[90%]">
                    <div className={`inline-block px-14 py-6 rounded-xl xs:max-w-[calc(100%-11rem)] max-w-[100%] ${themeColors.component.input_bg}`}>
                        <ul className={`flex justify-end items-baseline gap-8 md:text-3xl xxs:text-2xl text-[95%] ${themeColors.component.text}`}>
                            <li className="xxs:text-[2.60rem] px-4 font-semibold overflow-x-scroll">{state.inputData.amount}</li>
                            <li className="font-semibold">{state.inputData.currency}</li>
                        </ul>
                    </div>
                    <div className="xs:min-w-[11rem] max-w-0">
                        <p className={`font-questrial md:text-3xl text-2xl xs:block hidden ${themeColors.accent_text}`}>converts into</p>
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex flex-wrap w-full p-8 rounded-3xl border-[1px] border-orange-200">
                        <div className="block w-full">
                            <ul className="flex gap-4 justify-end text-[1.2rem] text-slate-300">
                                <li className="cursor-pointer hover:text-orange-500">copy all</li>
                                <li>|</li>
                                <li className="cursor-pointer hover:text-orange-500">export all</li>
                            </ul>
                        </div>
                        <div className="flex flex-wrap w-full">
                            <button ref={targetComponentRef} type="button"></button>
                            {
                                // eslint-disable-next-line react/prop-types
                                children.props.list && children.props.list.values.map((element, index) => {
                                    return (
                                        <div key={index} className="max-w-full">
                                            <div className={`flex gap-8 justify-center items-end px-8 py-4 m-4 rounded-xl border-[1px] max-w-[90%] ${themeColors.border.result}`}>
                                                <div values={element} className={`xxs:text-4xl text-[95%] font-light pr-4 overflow-x-scroll ${themeColors.result_text}`}>
                                                    {element[0]}
                                                </div>
                                                <div values={element} className={`xxs:text-4xl text-[95%] ${themeColors.result_text}`}>
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
                <div className="w-full text-end md:mt-[0.5rem] mt-[2rem]">
                    <button className={`${themeColors.button.default} ${themeColors.button.hover} ${themeColors.accent_text} ${themeColors.animate_settings.button}`}>
                        <a href="">Reset</a>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Results;