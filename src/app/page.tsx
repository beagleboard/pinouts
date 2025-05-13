"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Pinouts from "./Pinouts";
import yaml from "js-yaml";

export default function Home() {
  type TableDataItem = {
    left: string;
    lefsubClass: string;
    leftSub: string[];
    row: (string | number)[];
    right: string;
    rightsubClass: string;
    rightSub: string[];
    lefsubClass1?: string;
    leftSub1?: string[];
    rightSub1?: string[];
    rightsub1Class?: string;
  };

  const [tableData1, setTableData1] = useState([
    { left: "P1.01", lefsubClass: "bg-[#FE5555] text-white", leftSub: ["VIN_5V(SYS)"], row: ["01", "02"], right: "P1.02", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPIO1_10(Analog)"], },
    { left: "P1.03", lefsubClass: "bg-[#E9BB34] text-black", leftSub: ["GPIO1_51"], row: ["03", "04"], right: "P1.04", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPIO1_12"], },
    { left: "P1.05", lefsubClass: "bg-[#FE5555] text-white", leftSub: ["USB1_VBUS(USB)"], row: ["05", "06"], right: "P1.06", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPIO1_13(SPI)"], },
    { left: "P1.07", lefsubClass: "bg-[#FE5555] text-white", leftSub: ["VIN_USB"], row: ["07", "08"], right: "P1.08", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPIO1_14(SPI)"], },
    { left: "P1.09", lefsubClass: "bg-[#416EB1] text-white", leftSub: ["USB1_DN"], row: ["09", 10], right: "P1.10", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPIO1_30(SPI)"], },
    { left: "P1.11", lefsubClass: "bg-[#416EB1] text-white", leftSub: ["USB1_DP"], row: [11, 12], right: "P1.12", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPIO1_8(SPI)"], },
    { left: "P1.13", lefsubClass: "bg-[#E9BB34] text-black", leftSub: ["GPIO0_36"], row: [13, 14], right: "P1.14", rightsubClass: "bg-[#FE5555] text-white", rightSub: ["VDD_3V3"], },
    { left: "P1.15", lefsubClass: "bg-[#191919] text-white", leftSub: ["GND(SYS)"], row: [15, 16], right: "P1.16", rightsubClass: "bg-[#191919] text-white", rightSub: ["GND"], },
    { left: "P1.17", lefsubClass1: "bg-[#191919] text-white", lefsubClass: "bg-[#5ED28D] text-black", leftSub: ["AIN_REFN(Analog)"], row: [17, 18], right: "P1.18", rightsubClass: "bg-[#5ED28D] text-black", rightSub: ["AIN_REFP(Analog)"] },
    { left: "P1.19", lefsubClass1: "bg-[#5ED28D] text-black", lefsubClass: "bg-[#E9BB34] text-black", leftSub: ["GPIO1_1(Analog)"], row: [19, 20], right: "P1.20", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPI00_50(PRU)"], },
    { left: "P1.21", lefsubClass1: "bg-[#5ED28D] text-black", lefsubClass: "bg-[#E9BB34] text-black", leftSub: ["GPIO1_6(Analog)"], row: [21, 22], right: "P1.22", rightsubClass: "bg-[#191919] text-white", rightSub: ["GND"], },
    { left: "P1.23", lefsubClass1: "bg-[#5ED28D] text-black", lefsubClass: "bg-[#E9BB34] text-black", leftSub: ["GPIO1_5(Analog)"], row: [23, 24], right: "P1.24", rightsubClass: "bg-[#FE5555] text-white", rightSub: ["VOUT(SYS)"], },
    { left: "P1.25", lefsubClass1: "bg-[#5ED28D] text-black", lefsubClass: "bg-[#E9BB34] text-black", leftSub: ["GPIO1_4(Analog)"], row: [25, 26], right: "P1.26", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPIO0_44(CAN)"], },
    { left: "P1.27", lefsubClass1: "bg-[#5ED28D] text-black", lefsubClass: "bg-[#E9BB34] text-black", leftSub: ["GPIO1_3(Analog)"], row: [27, 28], right: "P1.28", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPIO0_43(CAN)"], },
    { left: "P1.29", lefsubClass: "bg-[#E9BB34] text-black", leftSub: ["GPIO1_62(PRU)"], row: [29, 30], right: "P1.30", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPI01_21(UART)"], },
    { left: "P1.31", lefsubClass: "bg-[#E9BB34] text-black", leftSub: ["GPIO1_59(PRU)"], row: [31, 32], right: "P1.32", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPI01_20(UART)"], },
    { left: "P1.33", lefsubClass: "bg-[#E9BB34] text-black", leftSub: ["GPIO1_29(PWM,PRU)"], row: [33, 34], right: "P1.34", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPI01_2"], },
    { left: "P1.35", lefsubClass: "bg-[#E9BB34] text-black", leftSub: ["GPIO0_88(PRU)"], row: [35, 36], right: "P1.36", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPI00_55(PWM,PRU)"], },
  ]);
  const [tableData2, setTableData2] = useState([
    { left: "P2.01", lefsubClass: "bg-[#E9BB34] text-black", leftSub1: [], leftSub: ["GPIO0_86"], row: ["01", "02"], right: "P2.02", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPIO0_45(PRU)"], rightSub1: [], rightsub1Class: "" },
    { left: "P2.03", lefsubClass: "bg-[#E9BB34] text-black", leftSub1: [], leftSub: ["GPIO0_85(PWM)"], row: ["03", "04"], right: "P2.04", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPIO0_46(PRU)"], rightSub1: [], rightsub1Class: "" },
    { left: "P2.05", lefsubClass: "bg-[#E9BB34] text-black", leftSub1: [], leftSub: ["MCU_GPIO0_5"], row: ["05", "06"], right: "P2.06", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPIO0_47(PRU)"], rightSub1: [], rightsub1Class: "" },
    { left: "P2.07", lefsubClass: "bg-[#E9BB34] text-black", leftSub1: [], leftSub: ["MCU_GPIO0_6"], row: ["07", "08"], right: "P2.08", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPIO0_48"], rightSub1: [], rightsub1Class: "" },
    { left: "P2.09", lefsubClass: "bg-[#E9BB34] text-black", leftSub1: [], leftSub: ["MCU_GPIO0_16(CAN)"], row: ["09", 10], right: "P2.10", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPIO0_91"], rightSub1: [], rightsub1Class: "" },
    { left: "P2.11", lefsubClass: "bg-[#E9BB34] text-black", leftSub1: [], leftSub: ["MCU_GPIO0_15(CAN)"], row: [11, 12], right: "P2.12", rightsubClass: "bg-[#51726B] text-white", rightSub: ["PWR_BTN(SYS,PRU)"], rightSub1: [], rightsub1Class: "" },
    { left: "P2.13", lefsubClass: "bg-[#DB3838] text-white", leftSub1: [], leftSub: ["VOUT_VSYS(SYS)"], row: [13, 14], right: "P2.14", rightsubClass: "bg-[#FE5555] text-white", rightSub: ["VBAT"], rightSub1: [], rightsub1Class: "" },
    { left: "P2.15", lefsubClass: "bg-[#191919] text-white", leftSub1: [], leftSub: ["GND"], row: [15, 16], right: "P2.16", rightsubClass: "bg-[#5ED28D] text-black", rightSub: ["BAT_TEMP"], rightSub1: [], rightsub1Class: "" },
    { left: "P2.17", lefsubClass: "bg-[#E9BB34] text-black", leftSub1: [], leftSub: ["GPIO0_64"], row: [17, 18], right: "P2.18", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPIO0_53(PRU)"], rightSub1: [], rightsub1Class: "" },
    { left: "P2.19", lefsubClass1: "bg-[] text-black", leftSub1: [], lefsubClass: "bg-[#E9BB34] text-black", leftSub: ["GPIO1_0"], row: [19, 20], right: "P2.20", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPIO0_49"], rightSub1: [], rightsub1Class: "" },
    { left: "P2.21", lefsubClass1: "bg-[] text-black", leftSub1: [], lefsubClass: "bg-[#191919] text-white", leftSub: ["GND"], row: [21, 22], right: "P2.22", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPI00_63(PRU)"], rightSub1: [], rightsub1Class: "" },
    { left: "P2.23", lefsubClass1: "bg-[] text-black", leftSub1: [], lefsubClass: "bg-[#DB3838] text-white", leftSub: ["VDD_3V3(SYS)"], row: [23, 24], right: "P2.24", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPIO0_51(PRU)"], rightSub1: [], rightsub1Class: "" },
    { left: "P2.25", lefsubClass1: "bg-[] text-black", leftSub1: [], lefsubClass: "bg-[#E9BB34] text-black", leftSub: ["GPIO1_19"], row: [25, 26], right: "P2.26", rightsubClass: "bg-[#B1426E] text-white", rightSub: ["nRESET(SYS)"], rightSub1: [], rightsub1Class: "" },
    { left: "P2.27", lefsubClass1: "bg-[] text-black", leftSub1: [], lefsubClass: "bg-[#E9BB34] text-black", leftSub: ["GPIO1_18"], row: [27, 28], right: "P2.28", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPIO0_61(PRU)"], rightSub1: [], rightsub1Class: "" },
    { left: "P2.29", lefsubClass: "bg-[#E9BB34] text-black", leftSub1: [], leftSub: ["GPIO0_40"], row: [29, 30], right: "P2.30", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPIO0_58(PRU)"], rightSub1: [], rightsub1Class: "" },
    { left: "P2.31", lefsubClass: "bg-[#E9BB34] text-black", leftSub1: [], leftSub: ["GPIO0_90(PRU)"], row: [31, 32], right: "P2.32", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPI00_57(PRU)"], rightSub1: [], rightsub1Class: "" },
    { left: "P2.33", lefsubClass: "bg-[#E9BB34] text-black", leftSub1: [], leftSub: ["GPIO0_52(PRU)"], row: [33, 34], right: "P2.34", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPIO0_60(PRU)"], rightSub1: [], rightsub1Class: "" },
    { left: "P2.35", lefsubClass1: "bg-[#5ED28D] text-black", lefsubClass: "bg-[#E9BB34] text-black", leftSub1: ["PA20", "ADC_CH5"], leftSub: ["GPIO0_53(Analog,PRU)"], row: [35, 36], right: "P2.36", rightsubClass: "bg-[#E9BB34] text-black", rightSub: ["GPI01_16(Analog)"], rightSub1: ["ADC_CH7", "PA15"], rightsub1Class: "bg-[#5ED28D] text-black" },
  ]);

  const [pins, setPins] = useState<Record<string, any>>({});
  const [selectedPin, setSelectedPin] = useState<string>("");
  const [pinDetails, setPinDetails] = useState<Record<string, any> | null>(null);
  const [isBUSmode, setBUSmode] = useState(false);
  const [originalTableData1, setOriginalTableData1] = useState<TableDataItem[]>([]);
  const [originalTableData2, setOriginalTableData2] = useState<TableDataItem[]>([]);
  const [activeTable, setActiveTable] = useState<"P1" | "P2">("P1"); // State to track active table

  useEffect(() => {
    setOriginalTableData1(tableData1);
    setOriginalTableData2(tableData2);
  }, []);

  const resetTables = () => {
    setTableData1(JSON.parse(JSON.stringify(originalTableData1)));
    setTableData2(JSON.parse(JSON.stringify(originalTableData2)));
    setBUSmode(false);
    setValidSubs([]);
  };

  const handleBusMode = (busData: string[][]) => {
    resetTables();
    busData.forEach(([pin, label]) => updatePin(pin, label));
    setBUSmode(true);
    setValidSubs(busData.map(([, label]) => label));
  };

  const updatePinSub1 = (pin: string, newValue: string) => {
    const port = pin.split(".")[0]; // "P2"
    if (port == "P1") {
      setTableData1((prevData) =>
        prevData.map((row) => {
          const pinNumber = parseInt(pin.replace("P1.", ""), 10);
          if (!isNaN(pinNumber)) {
            if (pinNumber % 2 !== 0 && row.left === pin) {
              return { ...row, leftSub: [newValue] };
            } else if (pinNumber % 2 === 0 && row.right === pin) {
              return { ...row, rightSub: [newValue] };
            }
          }
          return row;
        })
      );
    }
    else if (port == "P2") {
      setTableData2((prevData) =>
        prevData.map((row) => {
          const pinNumber = parseInt(pin.replace("P2.", ""), 10);
          if (!isNaN(pinNumber)) {
            if (pinNumber % 2 !== 0 && row.left === pin) {
              return { ...row, leftSub: [newValue] };
            } else if (pinNumber % 2 === 0 && row.right === pin) {
              return { ...row, rightSub: [newValue] };
            }
          }
          return row;
        })
      );
    }
  };

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const [response1, response2] = await Promise.all([
          fetch("./P1.yaml"),
          fetch("./P2.yaml"),
        ]);
        const [text1, text2] = await Promise.all([
          response1.text(),
          response2.text(),
        ]);
        const data1 = yaml.load(text1) as Record<string, any>;
        const data2 = yaml.load(text2) as Record<string, any>;
        const mergedPins = { ...data1.pins, ...data2.pins };
        setPins(mergedPins);
      } catch (error) {
        console.error("Failed to fetch pin data:", error);
      }
    };
    fetchPins();
  }, []);

  const handlePinClick = (pin: string) => {
    if (pins[pin]) {
      setSelectedPin(pin);
      setPinDetails(pins[pin]);
      console.log(pins[pin]);
    } else {
      console.warn(`Pin ${pin} not found.`);
    }
  };


  
  const getPinModes = (pinName: string, signalName: string) => {
    return pins[pinName]?.[signalName] || {};
  };

  const updatePin = (pinName: string, newValue: string) => {
    setTableData1((prevData) =>
      prevData.map((row) => {
        const updatedRow = { ...row };
        if (row.leftSub.includes(pinName)) {
          updatedRow.leftSub = [newValue];
        }
        if (row.rightSub.includes(pinName)) {
          updatedRow.rightSub = [newValue];
        }
        return updatedRow;
      })
    );

    setTableData2((prevData) =>
      prevData.map((row) => {
        const updatedRow = { ...row };
        if (row.leftSub.includes(pinName)) {
          updatedRow.leftSub = [newValue];
        }
        if (row.rightSub.includes(pinName)) {
          updatedRow.rightSub = [newValue];
        }
        return updatedRow;
      })
    );
  };

  const SPI = [
    ["GPIO1_13(SPI)", "CS"],
    ["GPIO1_14(SPI)", "CLK"],
    ["GPIO1_30(SPI)", "MISO"],
    ["GPIO1_8(SPI)", "MOSI"]
  ];
  const UART = [
    ["GPI01_21(UART)", "TX"],
    ["GPI01_20(UART)", "RX"],
  ];
  const Analog = [
    ["AIN_REFN(Analog)", "REF-"],
    ["GPIO1_1(Analog)", "0"],
    ["GPIO1_6(Analog)", "1"],
    ["GPIO1_5(Analog)", "2"],
    ["GPIO1_4(Analog)", "3"],
    ["GPIO1_3(Analog)", "4"],
    ["GPIO1_10(Analog)", "6"],
    ["AIN_REFP(Analog)", "REF+"],
    ["GPIO0_53(Analog,PRU)", "5"],
    ["GPI01_16(Analog)", "7"]
  ];
  const PWM = [
    ["GPIO1_29(PWM,PRU)", "B"],
    ["GPI00_55(PWM,PRU)", "A"],
    ["GPIO0_85(PWM)", "A"],
  ];
  const PRU = [
    ["GPIO1_62(PRU)", "17"],
    ["GPIO1_59(PRU)", "13"],
    ["GPIO1_29(PWM,PRU)", "10"],
    ["GPIO0_88(PRU)", "1"],
    ["GPI00_50(PRU)", "5"],//
    ["GPI00_55(PWM,PRU)", "9"],//
    ["GPIO0_90(PRU)", "3"],
    ["GPIO0_52(PRU)", "15"],
    ["GPIO0_54(PRU)", "8"],
    ["GPIO0_53(Analog,PRU)", "16"],
    ["GPI00_63(PRU)", "18"],
    ["GPIO0_51(PRU)", "6"],
    ["GPIO0_61(PRU)", "15"],
    ["GPIO0_58(PRU)", "3"],
    ["GPI00_57(PRU)", "2"],
    ["GPIO0_45(PRU)", "0_87"],
    ["GPIO0_46(PRU)", "0_89"],
    ["GPIO0_47(PRU)", "TX"],
    ["PWR_BTN(SYS,PRU)", "RX"],
    ["GPIO0_60(PRU)", "5"]
  ];
  const CAN = [
    ["GPIO0_44(CAN)", "TX"],
    ["GPIO0_43(CAN)", "RX"],
    ["MCU_GPIO0_16(CAN)", "RX"],
    ["MCU_GPIO0_15(CAN)", "TX"],
  ];
  const BAT = [
    ["VBAT", "VIN"],
    ["BAT_TEMP", "TEMP"],
    ["GND", "GND"],
  ];
  const USB = [
    ["USB1_VBUS", "VBUS"],
    ["VIN_USB", "VIN"],
    ["USB1_DN", "DN"],
    ["USB1_DP", "DP"],
    ["GND", "GND"],
  ];
  const SYS = [
    ["VIN_5V(SYS)", "VIN"],
    ["VDD_3V3(SYS)", "3.3V"],
    ["GND(SYS)", "GND"],
    ["VOUT(SYS)", "VOUT"],
    ["VOUT_VSYS(SYS)", "VOUT"],
    ["VDD_3V3(SYS)", "3.3V"],
    ["PWR_BTN(SYS,PRU)", "PWRBTN"],
    ["nRESET(SYS)", "NRST"],
  ];
  const [validSubs, setValidSubs] = useState<string[]>([]);

  // Function to render the active table
  const renderActiveTable = () => {
    const tableData = activeTable === "P1" ? tableData1 : tableData2;
    const tableIndex = activeTable === "P1" ? 0 : 1;

    return (
      <div key={tableIndex} className="flex flex-col items-center justify-center w-full sm:w-xs max-w-xs sm:max-w-sm mr-1">

        <div className="flex justify-center w-full">
          <table className="border-collapse border-0 lg:h-[60vh] lg:w-[20vh] xl:w-[40vh] lg:text-[12px] xl:font-normal 2xl:text-sm">
            <tbody>
              {tableData.map((data, index) => (
                <tr key={index}>
                  <td className={`relative text-right px-2`}>
                    <div className="inline-flex items-center">
                      {data.leftSub.map((sub, idx) => (
                        <span
                          key={idx}
                          className={`inline-block px-2 py-1 ml-1 transform -skew-x-12 rounded-md ${isBUSmode
                            ? validSubs.includes(sub)
                              ? data.lefsubClass
                              : "bg-gray-400 text-white"
                            : data.lefsubClass
                            }`}
                        >
                          <span className="inline-block transform skew-x-12">{sub}</span>
                        </span>
                      ))}
                      <span
                        className="inline-block px-2 py-1 ml-1 transform -skew-x-12 cursor-pointer rounded-md bg-[#cc0077]"
                        onClick={() => { handlePinClick(data.left) }}
                      >
                        <span className="inline-block text-white transform skew-x-12">{data.left}</span>
                      </span>
                    </div>
                  </td>

                  <td className="text-center justify-center px-2">
                    <span className="flex items-center justify-center text-white rounded-md bg-gray-700" style={{ width: '1.75rem', height: '1.75rem' }}>
                      {data.row[0]}
                    </span>
                  </td>
                  <td className="text-center justify-center px-2">
                    <span className="flex items-center justify-center text-white rounded-md bg-gray-700" style={{ width: '1.75rem', height: '1.75rem' }}>
                      {data.row[1]}
                    </span>
                  </td>
                  <td className={`text-left`}>
                    <div className="inline-flex items-center">
                      <span
                        className="inline-block px-2 py-1 ml-1 cursor-pointer transform -skew-x-12 rounded-md bg-[#cc0077]"
                        onClick={() => { handlePinClick(data.right) }}
                      >
                        <span className="inline-block transform skew-x-12">{data.right}</span>
                      </span>
                      {data.rightSub.map((sub, idx) => (
                        <span
                          key={idx}
                          className={`inline-block px-2 py-1 ml-1 transform -skew-x-12 rounded-md ${isBUSmode
                            ? validSubs.includes(sub)
                              ? data.rightsubClass
                              : "bg-gray-400 text-white"
                            : data.rightsubClass
                            }`}
                        >
                          <span className="inline-block transform skew-x-12">{sub}</span>
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:h-screen m-0 p-0 ">
      <div>
        <div className="top-0 md:left-0 md:right-0 border-b flex backdrop-blur-sm justify-center py-[10px] items-center font-bold z-50">
          <div className="flex w-full max-w-screen mx-2 md:mx-4 justify-between items-center">
            <div className="flex flex-row gap-2 items-center group">
              <Link href="/">
                <div className="font-rancho font-bold text-2xl duration-300 pl-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text ">
                  Pinouts
                </div>
              </Link>
            </div>
            <div className="flex gap-0 md:gap-2 items-center">
              <Link
                href="https://github.com/beagleboard/pinouts"
                target="__blank"
              >
                <GitHubLogoIcon width={24} height={24} className="text-black" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <main className="flex flex-col flex-[1_1_0%] min-h-80 bg-highlight rounded-2xl max-w-[300vh] relative">
        {/* Tables Section */}
        {/* Render the active table */}
        <div className="flex flex-row  flex-[1_1_0%]  min-h-60 bg-gray-100 rounded-lg  shadow-md rounded-2xl m-4 relative  ">

          <div className="flex flex-col items-center justify-center lg:basis-1/3 ">
            <div className="absolute top-0  justify-start items-center">
              <button
                className={`px-4 py-2 rounded-md rounded-r-none ${activeTable === "P1"
                  ? "bg-[#cc0077] text-white"
                  : "bg-gray-300 text-gray-700"
                  }`}
                onClick={() => setActiveTable("P1")}
              >
                P1
              </button>
              <button
                className={`px-4 py-2 rounded-md rounded-l-none ${activeTable === "P2"
                  ? "bg-[#cc0077] text-white"
                  : "bg-gray-300 text-gray-700"
                  }`}
                onClick={() => setActiveTable("P2")}
              >
                P2
              </button>
            </div>
            {renderActiveTable()}
          </div>

          <div className="flex flex-col lg:basis-1/3 rounded-lg border border-gray-300 border-t-0 border-r-0 border-b-0 ">
            <div className="flex  items-center mb-4 max-w-[300vh]">
              <button className="px-3 py-1 bg-teal-600 text-white text-sm mr-[0.1rem] hover:bg-teal-700"
                onClick={() => resetTables()}>ALL</button>
              <button className="px-3 py-1 bg-blue-600 text-white text-sm mr-[0.1rem] hover:bg-blue-700"
                onClick={() => handleBusMode(SYS)}>SYS</button>
              <button className="px-3 py-1 bg-green-600 text-white text-sm mr-[0.1rem] hover:bg-green-700"
                onClick={() => handleBusMode(USB)}>USB</button>
              <button className="px-3 py-1 bg-yellow-500 text-black text-sm mr-[0.1rem] hover:bg-yellow-600"
                onClick={() => handleBusMode(Analog)}>Analog</button>
              <button
                className="px-3 py-1 bg-purple-600 text-white text-sm mr-[0.1rem] hover:bg-purple-700"
                onClick={() => handleBusMode(SPI)}
              >
                SPI
              </button>
              <button
                className="px-3 py-1 bg-red-600 text-white text-sm mr-[0.1rem] hover:bg-red-700"
                onClick={() => handleBusMode(UART)}
              >
                UART
              </button>
              <button className="px-3 py-1 bg-[#FF00FF] text-white text-sm mr-[0.1rem] hover:bg-[#FF00FF]"
                onClick={() => handleBusMode(PWM)}>PWM</button>

              <button className="px-3 py-1 bg-cyan-600 text-white text-sm mr-[0.1rem] hover:bg-cyan-700"
                onClick={() => handleBusMode(BAT)}
              >BAT</button>
              <button className="px-3 py-1 bg-purple-600 text-white text-sm mr-[0.1rem] hover:bg-purple-700"
                onClick={() => handleBusMode(CAN)}
              >CAN</button>
              <button className="px-3 py-1 bg-[#FFD700] text-black text-sm mr-[0.1rem] hover:bg-[#FFD709]"
                onClick={() => handleBusMode(PRU)}>PRU</button>
            </div>
            <h2 className="text-xl text-black font-bold mb-4">  AM6254(BALL:some) {selectedPin}</h2>
            <div className="text-black ">
              {pinDetails ? (
                <div className="mb-4">
                  <table className=" border-collapse border border-gray-300 table-fixed">
                    <thead>
                      <tr className="">
                        <th className="  max-w-[40px] text-sm">Mode</th>
                        {Object.keys(pinDetails).map((pin) => (
                          <th
                            key={pin}
                            className="border border-gray-300  text-sm truncate whitespace-nowrap"
                          >
                            <button
                              className="px-2 py-1 bg-blue-500 text-white  hover:bg-blue-600 w-full text-xs"
                              onClick={() => {
                                updatePinSub1(selectedPin, pin);
                              }}
                            >
                              {pin}
                            </button>
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {[...Array(9).keys()].map((modeIndex) => (
                        <tr key={`mode${modeIndex}`} className="text-center">
                          <td className="  font-bold xl:text-[12px] 2xl:text-sm whitespace-nowrap">
                            Mode{modeIndex}
                          </td>
                          {Object.keys(pinDetails).map((pin, i) => {
                            let modeValue = "";
                            if (pins[selectedPin]) {
                              const firstSignal = Object.keys(pins[selectedPin])[i];
                              modeValue = getPinModes(selectedPin, firstSignal)[`mode${modeIndex}`] || "";
                            }
                            const displayValue = modeValue.trim() ? modeValue : "~";
                            return (
                              <td
                                key={`${pin}-mode${modeIndex}`}
                                className="border border-gray-300  text-xs whitespace-nowrap overflow-hidden xl:text-[8px] 2xl:text-sm text-ellipsis"
                              >
                                {displayValue === "~" ? (
                                  displayValue
                                ) : (
                                  <button
                                    className="px-2 py-1 bg-blue-500 text-white  hover:bg-blue-600 w-full text-xs"
                                    onClick={() => {
                                      updatePinSub1(selectedPin, modeValue);
                                    }}
                                  >
                                    {displayValue}
                                  </button>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}

                    </tbody>

                  </table>
                  <div className="font-bold">
                    MSPM0C1103
                  </div>
                  {["Mspm0mode", "Mspm1mode"]
                    .filter(label => {
                      // Only show row if any pin has a value for this label
                      return Object.keys(pinDetails).some(pin => {
                        if (pins[selectedPin]) {
                          const firstSignal = Object.keys(pins[selectedPin])[0];
                          const modeValue = getPinModes(selectedPin, firstSignal)[label];
                          return modeValue && modeValue.trim() !== "";
                        }
                        return false;
                      });
                    })
                    .map(label => (
                      <tr key={label} className="text-center">
                        <td className="font-bold xl:text-[12px] 2xl:text-sm whitespace-nowrap">
                          {label}
                        </td>
                        {Object.keys(pinDetails)
                          .filter(pin => {
                            if (pins[selectedPin]) {
                              const signalKeys = Object.keys(pins[selectedPin]);
                              const signal = signalKeys[Object.keys(pinDetails).indexOf(pin)];
                              const modeValue = getPinModes(selectedPin, signal)?.[label];
                              return modeValue && modeValue.trim() !== "";
                            }
                            return false;
                          })
                          .map((pin, i) => {
                            let modeValue = "";
                            if (pins[selectedPin]) {
                              const signalKeys = Object.keys(pins[selectedPin]);
                              const signal = signalKeys[Object.keys(pinDetails).indexOf(pin)];
                              modeValue = getPinModes(selectedPin, signal)?.[label] || "";
                            }
                            return (
                              <td
                                key={`${pin}-${label}`}
                                className="border border-gray-300 text-xs whitespace-nowrap overflow-hidden xl:text-[8px] 2xl:text-sm text-ellipsis"
                              >
                                <button
                                  className="px-2 py-1 bg-blue-500 text-white hover:bg-blue-600 w-full text-xs"
                                  onClick={() => updatePinSub1(selectedPin, modeValue)}
                                >
                                  {modeValue}
                                </button>
                              </td>
                            );
                          })}
                      </tr>
                    ))}

                </div>
              ) : (
                <div>
                  <strong> BeagleBoard.org Pinouts </strong>
                  <p>An interactive BeagleBoard.org single board computers cape header pins information portal.</p>
                  <p>Action: Click on PX.Y of your choice to see it's information here!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-2 border-t md:px-4">
        <p className="text-sm text-muted-foreground text-black">
          <Link href="https://docs.beagleboard.org/" target="_blank">
            <Pinouts /> | &copy; {new Date().getFullYear()} BeagleBoard.org Foundation.</Link>
        </p>
        <nav className="sm:ml-auto text-black flex gap-4 sm:gap-6">
          <Link className="text-sm hover:underline underline-offset-4" target="_blank" href="https://docs.beagleboard.org/">
            Docs
          </Link>
          <Link className="text-sm hover:underline underline-offset-4" href="https://www.beagleboard.org/" target="_blank">
            Site
          </Link>
        </nav>
      </footer>
    </div>
  );
}