"use client";
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import beagleLogo from './pinout-beagle-logo.png';
import beagleOrientation from './beagley-orientation.png';
import { useRouter, useSearchParams } from 'next/navigation';


interface Pin {
  number: number;
  name: string;
  type: 'gpio' | 'pow3v3' | 'pow5v' | 'gnd' | 'i2c' | 'spi' | 'uart' | 'pcm';
  description?: string;
  so_c?: string;
  altFunction?: string;
  MCU?: string;
  GPIO?: string;
  JTAG?: string;
  PWM?: string;
  PCM?: string;
  '1-WIRE'?: string;
  I2C?: string;
  UART?: string;
  SPI?: string;
  socPin?: string;
}
interface PinData {
  title: string;
  functions: { name: string; values: string[] }[];
  notes: string[];
  description?: string;
  learnMoreLink?: string;
}

type PinDataMap = {
  [key: string]: PinData;
};

const BeagleYAI = () => {
  const leftPins: Pin[] = [
    { number: 1, name: '3v3 Power', type: 'pow3v3' },
    { number: 3, name: 'GPIO 2', type: 'i2c', altFunction: 'I2C1 SDA', so_c: 'E11', MCU: 'MCU_I2C0_SDA', GPIO: 'SoC Pin E11', I2C: 'Data', UART: 'CTS / Clear to send', socPin: 'SOC Pin E11' },
    { number: 5, name: 'GPIO 3', type: 'i2c', altFunction: 'I2C1 SCL', so_c: 'B13', MCU: 'MCU_I2C0_SCL', GPIO: 'SoC Pin B13', I2C: 'clock', UART: 'RTS / Request to send', socPin: 'SOC Pin B13' },
    { number: 7, name: 'GPIO 4', type: 'gpio', so_c: 'W26', GPIO: 'SoC Pin W26', '1-WIRE': 'Data', UART: 'TXD / Transmit', socPin: 'SOC Pin W26' },
    { number: 9, name: 'Ground', type: 'gnd' },
    { number: 11, name: 'GPIO 17', type: 'gpio', so_c: 'A26', GPIO: 'SoC Pin A26', PWM: 'ECAP2*', PCM: 'MCASP0_AXR2*', UART: 'RTS / Request to send', SPI: 'SPI1 CE1/SPI2_D1*', socPin: 'SOC Pin A26' },
    { number: 13, name: 'GPIO 27', type: 'gpio', so_c: 'N22', GPIO: 'SoC Pin N22', PCM: 'MCASP1_AXR1*', socPin: 'SOC Pin N22' },
    { number: 15, name: 'GPIO 22', type: 'gpio', so_c: 'R27', GPIO: 'SoC Pin R27', PCM: 'MCASP2_AXR14*', I2C: 'I2C4 Clock', socPin: 'SOC Pin R27' },
    { number: 17, name: '3v3 Power', type: 'pow3v3' },
    { number: 19, name: 'GPIO 10', type: 'spi', altFunction: 'SPI0 MOSI', so_c: 'B12', MCU: 'MCU_SPI0_D0', GPIO: 'SoC Pin B12', UART: 'CTS/ Clear to send', SPI: 'SPI0 MOSI', socPin: 'SOC Pin B12' },
    { number: 21, name: 'GPIO 9', type: 'spi', altFunction: 'SPI0 MISO', so_c: 'C11', MCU: 'MCU_SPI0_D1', GPIO: 'SoC Pin C11', UART: 'RXD / Receive', SPI: 'SPI0 MISO', socPin: 'SOC Pin C11' },
    { number: 23, name: 'GPIO 11', type: 'spi', altFunction: 'SPI0 SCLK', so_c: 'A9', MCU: 'MCU_SPI0_CLK', GPIO: 'SoC Pin A9', UART: 'RTS / Request to send', SPI: 'SPI0 SCLK', socPin: 'SOC Pin A9' },
    { number: 25, name: 'Ground', type: 'gnd' },
    { number: 27, name: 'GPIO 0', type: 'i2c', altFunction: 'EEPROM SDA', so_c: 'D11', GPIO: 'SoC Pin D11', I2C: 'EEPROM Data', UART: 'TXD / Transmit', socPin: 'SOC Pin D11' },
    { number: 29, name: 'GPIO 5', type: 'gpio', so_c: 'B20', GPIO: 'SoC Pin B20', PWM: 'EHRPWM0*', UART: 'RXD / Receive', SPI: 'SPI0_CS0*', socPin: 'SOC Pin B20' },
    { number: 31, name: 'GPIO 6', type: 'gpio', so_c: 'D20', GPIO: 'SoC Pin D20', PWM: 'EHRPWM1*', UART: 'CTS / Clear to send', SPI: 'SPI0_CLK*', socPin: 'SOC Pin D20' },
    { number: 33, name: 'GPIO 13', type: 'gpio', altFunction: 'PWM1', so_c: 'E19', GPIO: 'SoC Pin E19', PWM: 'PWM1', PCM: 'FS', UART: 'RXD / Receive', SPI: 'SPI0_D1*', socPin: 'SOC Pin E19' },
    { number: 35, name: 'GPIO 19', type: 'pcm', altFunction: 'PCM FS', so_c: 'C26', GPIO: 'SoC Pin C26', PWM: 'PWM1', PCM: 'MCASP2_AXR12*', SPI: 'SPI1 MISO', socPin: 'SOC Pin C26' },
    { number: 37, name: 'GPIO 26', type: 'gpio', so_c: 'P26', GPIO: 'SoC Pin P26', socPin: 'SOC Pin P26' },
    { number: 39, name: 'Ground', type: 'gnd' },
  ];

  const rightPins: Pin[] = [
    { number: 2, name: '5v Power', type: 'pow5v' },
    { number: 4, name: '5v Power', type: 'pow5v' },
    { number: 6, name: 'Ground', type: 'gnd' },
    { number: 8, name: 'GPIO 14', type: 'uart', altFunction: 'UART TX', so_c: 'F24', GPIO: 'SoC Pin F24', PWM: 'EHRPWM0*', PCM: 'MCASP0_ACLKR*', UART: 'TXD / Transmit', SPI: 'SPI2_CLK*', socPin: 'SOC Pin F24' },
    { number: 10, name: 'GPIO 15', type: 'uart', altFunction: 'UART RX', so_c: 'C27', GPIO: 'SoC Pin C27', PWM: 'EHRPWM0*', PCM: 'MCASP0_AFSR*', UART: 'RXD / Receive', SPI: 'SPI2_CS0*', socPin: 'SOC Pin C27' },
    { number: 12, name: 'GPIO 18', type: 'pcm', altFunction: 'PCM CLK', so_c: 'D25', GPIO: 'SoC Pin D25', PWM: 'PWM0', PCM: 'CLK', SPI: 'SPI1 CEO / SPI2_CS1*', socPin: 'SOC Pin D25' },
    { number: 14, name: 'Ground', type: 'gnd' },
    { number: 16, name: 'GPIO 23', type: 'gpio', so_c: 'B5', MCU: 'MCU_UART0_CTSn', GPIO: 'SoC Pin B5', SPI: 'MCU_SPI1_D0*', socPin: 'SOC Pin B5' },
    { number: 18, name: 'GPIO 24', type: 'gpio', so_c: 'C8', MCU: 'MCU_SPI1_CS2', GPIO: 'SoC Pin C8', SPI: 'MCU_SPI1_CS2*', socPin: 'SOC Pin C8' },
    { number: 20, name: 'Ground', type: 'gnd' },
    { number: 22, name: 'GPIO 25', type: 'gpio', so_c: 'P21', GPIO: 'SoC Pin P21', PCM: 'MCASP2_AXR15*', I2C: 'I2C4 Data*', socPin: 'SOC Pin P21' },
    { number: 24, name: 'GPIO 8', type: 'spi', altFunction: 'SPI0 CE0', so_c: 'C12', MCU: 'MCU_SPI0_CS0', GPIO: 'SoC Pin C12', PWM: 'SPI0 CE0', UART: 'TXD / Transmit', SPI: 'SPI0 CE0', socPin: 'SOC Pin C12' },
    { number: 26, name: 'GPIO 7', type: 'spi', altFunction: 'SPI0 CE1', so_c: 'B3', MCU: 'MCU_SPI0_CS2', GPIO: 'SoC Pin B3', PWM: 'SPI0 CE1', UART: 'RTS / Request to send', SPI: 'SPI0 CE1', socPin: 'SOC Pin B3' },
    { number: 28, name: 'GPIO 1', type: 'i2c', altFunction: 'EEPROM SCL', so_c: 'B9', GPIO: 'SoC Pin B9', PWM: 'EEPROM SCL', I2C: 'EEPROM Clock', UART: 'RXD / Receive', socPin: 'SOC Pin B9' },
    { number: 30, name: 'Ground', type: 'gnd' },
    { number: 32, name: 'GPIO 12', type: 'gpio', altFunction: 'PWM0', so_c: 'C20', GPIO: 'SoC Pin C20', PWM: 'PWM0', UART: 'TXD / Transmit', SPI: 'SPI0_CS0', socPin: 'SOC Pin C20' },
    { number: 34, name: 'Ground', type: 'gnd' },
    { number: 36, name: 'GPIO 16', type: 'gpio', so_c: 'A25', GPIO: 'SoC Pin A25', PWM: 'ECAP1*', PCM: 'MCASP0_AXR3*', UART: 'CTS / Clear to send', SPI: 'SPI1 CE2/SPI2_D0', socPin: 'SOC Pin A25' },
    { number: 38, name: 'GPIO 20', type: 'pcm', altFunction: 'PCM DIN', so_c: 'F23', GPIO: 'SoC Pin F23', PWM: 'EHRPWM1*', PCM: 'DIN', SPI: 'SPI1 MOSI', socPin: 'SOC Pin F23' },
    { number: 40, name: 'GPIO 21', type: 'pcm', altFunction: 'PCM DOUT', so_c: 'B25', GPIO: 'SoC Pin B25', PWM: 'EHRPWM1*', PCM: 'DOUT', SPI: 'SPI1 SCLK', socPin: 'SOC Pin B25' },
  ];
  type BusType =
    | "GPCLK*"
    | "MCU"
    | "GPIO"
    | "I2C"
    | "SPI"
    | "UART"
    | "PCM"
    | "JTAG*"
    | "Ground"
    | "3v3 Power"
    | "5v Power"
    | "SoC Pin";
  const [gpio, setbus] = useState<string>('GPIO');
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const pinNumber = searchParams.get('pin');
    const bus = searchParams.get('bus');

    if (pinNumber) {
      const pinNum = parseInt(pinNumber);
      const foundPin = [...leftPins, ...rightPins].find(pin => pin.number === pinNum);
      if (foundPin) {
        setbus('Pin Details');
        setMode('Pin Details');
        setSelectedPin(foundPin);
      }
    } else if (bus) {
      setbus(bus);
      setMode(bus);
      setSelectedPin(null);
    }
  }, [searchParams]);
  const pinData: PinDataMap = {
    "GPIO 2": {
      title: "GPIO 2 (I2C Data)",
      functions: [
        { name: "Alt0", values: ["MCU_I2C0_SDA"] },
        { name: "Alt7", values: ["MCU_GPIO0_18"] }
      ],
      notes: [
        "Physical/Board pin 3",
        "GPIO/BCM pin 2",
        "SoC pin E11",
        "GPIO/BCM pin 0 on Rev 1 (very early) Pi"
      ],
      description: "SDA (I2C1 Data) is one of the i2c pins on BeagleY-AI. SDA includes a fixed, 2.2 kΩ pull-up to 3.3v, which means this pin is not suitable for use as a general purpose IO where no pull-up resistor is desired.",
      learnMoreLink: "/pinout/i2c"
    },
    "GPIO 3": {
      title: "GPIO 3 (I2C Clock)",
      functions: [
        { name: "Alt0", values: ["MCU_I2C0_SCL"] },
        { name: "Alt7", values: ["MCU_GPIO0_17"] }
      ],
      notes: [
        "Physical/Board pin 5",
        "GPIO/BCM pin 3",
        "SoC pin B13",
        "GPIO/BCM pin 1 on Rev 1 (very early) Pi"
      ],
      description: "SCL (I2C1 Clock) is one of the i2c pins on BeagleY-AI. SCL includes a fixed, 2.2 kΩ pull-up to 3.3v, which means this pin is not suitable for use as a general purpose IO where no pull-up resistor is desired.",
      learnMoreLink: "/pinout/i2c"
    },
    "GPIO 4": {
      title: "GPIO 4",
      functions: [
        { name: "Alt0", values: ["GPMC0_WAIT1"] },
        { name: "Alt1", values: ["VOUT0_EXTPCLKIN"] },
        { name: "Alt2", values: ["GPMC0_A21"] },
        { name: "Alt3", values: ["UART6_RXD"] },
        { name: "Alt4", values: ["AUDIO_EXT_REFCLK2"] },
        { name: "Alt7", values: ["GPIO0_38"] },
        { name: "Alt8", values: ["EQEP2_I"] }
      ],
      notes: [
        "Physical/Board pin 7",
        "GPIO/BCM pin 4",
        "SoC pin W26"
      ]
    },
    "GPIO 17": {
      title: "GPIO 17",
      functions: [
        { name: "Alt0", values: ["MCASP0_AXR2"] },
        { name: "Alt1", values: ["SPI2_D1"] },
        { name: "Alt2", values: ["UART1_RTSn"] },
        { name: "Alt3", values: ["UART6_TXD"] },
        { name: "Alt5", values: ["ECAP2_IN_APWM_OUT"] },
        { name: "Alt7", values: ["GPIO1_8"] },
        { name: "Alt8", values: ["EQEP0_B"] }
      ],
      notes: [
        "Physical/Board pin 11",
        "GPIO/BCM pin 17",
        "SoC pin A26"
      ],
      description: "This pin is usable as a GPIO or with the hardware PWM-ECAP peripheral."
    },
    "GPIO 27": {
      title: "GPIO 27",
      functions: [
        { name: "Alt0", values: ["GPMC0_OEn_REn"] },
        { name: "Alt2", values: ["MCASP1_AXR1"] },
        { name: "Alt6", values: ["TRC_DATA8"] },
        { name: "Alt7", values: ["GPIO0_33"] }
      ],
      notes: [
        "Physical/Board pin 13",
        "GPIO/BCM pin 27",
        "SoC pin N22",
        "GPIO/BCM pin 21 on Rev 1 (very early) Pi"
      ],
      description: "This pin is usable as a GPIO."
    },
    "GPIO 22": {
      title: "GPIO 22",
      functions: [
        { name: "Alt0", values: ["GPMC0_CSn0"] },
        { name: "Alt1", values: ["I2C4_SCL"] },
        { name: "Alt3", values: ["MCASP2_AXR14"] },
        { name: "Alt6", values: ["TRC_DATA15"] },
        { name: "Alt7", values: ["GPIO0_41"] }
      ],
      notes: [
        "Physical/Board pin 15",
        "GPIO/BCM pin 22",
        "SoC pin R27"
      ]
    },
    "GPIO 10": {
      title: "GPIO 10",
      functions: [
        { name: "Alt0", values: ["MCU_SPI0_D0"] },
        { name: "Alt7", values: ["MCU_GPIO0_3"] }
      ],
      notes: [
        "Physical/Board pin 19",
        "GPIO/BCM pin 10",
        "SoC pin B12"
      ]
    },
    "GPIO 9": {
      title: "GPIO 9",
      functions: [
        { name: "Alt0", values: ["MCU_SPI0_D1"] },
        { name: "Alt7", values: ["MCU_GPIO0_4"] }
      ],
      notes: [
        "Physical/Board pin 21",
        "GPIO/BCM pin 9",
        "SoC pin C11"
      ]
    },
    "GPIO 11": {
      title: "GPIO 11",
      functions: [
        { name: "Alt0", values: ["MCU_SPI0_CLK"] },
        { name: "Alt7", values: ["MCU_GPIO0_2"] }
      ],
      notes: [
        "Physical/Board pin 23",
        "GPIO/BCM pin 11",
        "SoC pin A9"
      ]
    },
    "GPIO 0": {
      title: "GPIO 0 (HAT EEPROM i2c Data)",
      functions: [
        { name: "Alt0", values: ["WKUP_I2C0_SDA"] },
        { name: "Alt7", values: ["MCU_GPIO0_20"] }
      ],
      notes: [
        "Physical/Board pin 27",
        "GPIO/BCM pin 0",
        "SoC pin D11"
      ],
      description: "These pins are generally reserved for i2c communication with an EEPROM. Connect those pins for auto configuration, if the board provides the feature (check the board description for details of EEPROM functionality)."
    },
    "GPIO 5": {
      title: "GPIO 5",
      functions: [
        { name: "Alt0", values: ["SPI0_CS0"] },
        { name: "Alt2", values: ["EHRPWM0_A"] },
        { name: "Alt7", values: ["GPIO1_15"] }
      ],
      notes: [
        "Physical/Board pin 29",
        "GPIO/BCM pin 5",
        "SoC pin B20"
      ],
      description: "The pin is usable as a GPIO or with the hardware PWM peripheral."
    },
    "GPIO 6": {
      title: "GPIO 6",
      functions: [
        { name: "Alt0", values: ["SPI0_CLK"] },
        { name: "Alt1", values: ["CP_GEMAC_CPTS0_TS_SYNC"] },
        { name: "Alt2", values: ["EHRPWM1_A"] },
        { name: "Alt7", values: ["GPIO1_17"] }
      ],
      notes: [
        "Physical/Board pin 31",
        "GPIO/BCM pin 6",
        "SoC pin D20"
      ],
      description: "The pin is usable as a GPIO or with the hardware PWM peripheral."
    },
    "GPIO 13": {
      title: "GPIO 13 (PWM1)",
      functions: [
        { name: "Alt0", values: ["SPI0_D0"] },
        { name: "Alt1", values: ["CP_GEMAC_CPTS0_HW1TSPUSH"] },
        { name: "Alt2", values: ["EHRPWM1_B"] },
        { name: "Alt7", values: ["GPIO1_18"] }
      ],
      notes: [
        "Physical/Board pin 33",
        "GPIO/BCM pin 13",
        "SoC pin E19"
      ],
      description: "The pin is usable as a GPIO or hardware PWM."
    },
    "GPIO 19": {
      title: "GPIO 19",
      functions: [
        { name: "Alt0", values: ["SPI0_D0"] },
        { name: "Alt1", values: ["CP_GEMAC_CPTS0_HW1TSPUSH"] },
        { name: "Alt2", values: ["EHRPWM1_B"] },
        { name: "Alt7", values: ["GPIO1_18"] }
      ],
      notes: [
        "Physical/Board pin 35",
        "GPIO/BCM pin 19",
        "SoC pin C26"
      ],
      description: "The pin is usable as a GPIO or hardware PWM."
    },
    "GPIO 26": {
      title: "GPIO 26",
      functions: [
        { name: "Alt0", values: ["GPMC0_BE1n"] },
        { name: "Alt3", values: ["MCASP2_AXR12"] },
        { name: "Alt6", values: ["TRC_DATA11"] },
        { name: "Alt7", values: ["GPIO0_36"] }
      ],
      notes: [
        "Physical/Board pin 37",
        "GPIO/BCM pin 26",
        "SoC pin P26"
      ]
    },
    "GPIO 14": {
      title: "GPIO 14 (UART Transmit)",
      functions: [
        { name: "Alt0", values: ["MCASP0_ACLKR"] },
        { name: "Alt1", values: ["SPI2_CLK"] },
        { name: "Alt2", values: ["UART1_TXD"] },
        { name: "Alt6", values: ["EHRPWM0_B"] },
        { name: "Alt7", values: ["GPIO0_14"] },
        { name: "Alt8", values: ["EQEP1_I"] }
      ],
      notes: [
        "Physical/Board pin 8",
        "GPIO/BCM pin 14",
        "SoC pin F24"
      ],
      description: "This pin doubles up as the UART transmit pin, TX. It's also commonly known as 'Serial' and, by default, will output a Console from your BeagleY-AI that, with a suitable Serial cable, you can use to control the board via the command-line. UART can be used to talk to Serial GPS modules or sensors such as the PM5003, but you must make sure you disable the Serial Console from being attached to that port first. The pin is also usable as a GPIO or with the hardware PWM peripheral.",
      learnMoreLink: "/pinout/uart"
    },
    "GPIO 15": {
      title: "GPIO 15 (UART Receive)",
      functions: [
        { name: "Alt0", values: ["MCASP0_AFSR"] },
        { name: "Alt1", values: ["SPI2_CS0"] },
        { name: "Alt2", values: ["UART1_RXD"] },
        { name: "Alt6", values: ["EHRPWM0_A"] },
        { name: "Alt7", values: ["GPIO1_13"] },
        { name: "Alt8", values: ["EQEP1_S"] }
      ],
      notes: [
        "Physical/Board pin 10",
        "GPIO/BCM pin 15",
        "SoC pin C27"
      ],
      description: "This pin doubles up as the UART receive pin, RX. It's also commonly known as 'Serial' and, by default, will output a Console from your BeagleY-AI that, with a suitable Serial cable, you can use to control the board via the command-line. UART can be used to talk to Serial GPS modules or sensors such as the PM5003, but you must make sure you disable the Serial Console from being attached to that port first. The pin is also usable as a GPIO or with the hardware PWM peripheral.",
      learnMoreLink: "/pinout/uart"
    },
    "GPIO 18": {
      title: "GPIO 18 (PCM Clock)",
      functions: [
        { name: "Alt0", values: ["MCASP0_ACLKX"] },
        { name: "Alt1", values: ["SPI2_CS1"] },
        { name: "Alt2", values: ["ECAP2_IN_APWM_OUT"] },
        { name: "Alt7", values: ["GPIO1_11"] },
        { name: "Alt8", values: ["EQEP1_A"] }
      ],
      notes: [
        "Physical/Board pin 12",
        "GPIO/BCM pin 18",
        "SoC pin D25"
      ],
      description: "GPIO 18 can be used by MCASP0_ACLKX (PCM) to provide a clock signal to an external audio device such as a DAC chip. This pin is also usable as a GPIO or with the hardware PWM-ECAP peripheral."
    },
    "GPIO 23": {
      title: "GPIO 23",
      functions: [
        { name: "Alt0", values: ["MCU_UART0_CTSn"] },
        { name: "Alt1", values: ["MCU_TIMER_IO0"] },
        { name: "Alt3", values: ["MCU_SPI1_D0"] },
        { name: "Alt7", values: ["MCU_GPIO0_7"] }
      ],
      notes: [
        "Physical/Board pin 16",
        "GPIO/BCM pin 23",
        "SoC pin B5"
      ]
    },
    "GPIO 24": {
      title: "GPIO 24",
      functions: [
        { name: "Alt0", values: ["WKUP_UART0_TXD"] },
        { name: "Alt2", values: ["MCU_SPI1_CS2"] },
        { name: "Alt7", values: ["MCU_GPIO0_10"] }
      ],
      notes: [
        "Physical/Board pin 18",
        "GPIO/BCM pin 24",
        "SoC pin C8"
      ]
    },
    "GPIO 25": {
      title: "GPIO 25",
      functions: [
        { name: "Alt0", values: ["GPMC0_CSn1"] },
        { name: "Alt1", values: ["I2C4_SDA"] },
        { name: "Alt3", values: ["MCASP2_AXR15"] },
        { name: "Alt6", values: ["TRC_DATA16"] },
        { name: "Alt7", values: ["GPIO0_42"] }
      ],
      notes: [
        "Physical/Board pin 22",
        "GPIO/BCM pin 25",
        "SoC pin P21"
      ]
    },
    "GPIO 8": {
      title: "GPIO 8 (SPI Chip Select 0)",
      functions: [
        { name: "Alt0", values: ["MCU_SPI0_CS0"] },
        { name: "Alt4", values: ["WKUP_TIMER_IO1"] },
        { name: "Alt7", values: ["MCU_GPIO0_0"] }
      ],
      notes: [
        "Physical/Board pin 24",
        "GPIO/BCM pin 8",
        "SoC pin C12"
      ]
    },
    "GPIO 7": {
      title: "GPIO 7 (SPI Chip Select 1)",
      functions: [
        { name: "Alt0", values: ["WKUP_UART0_RXD"] },
        { name: "Alt2", values: ["MCU_SPI0_CS2"] },
        { name: "Alt7", values: ["MCU_GPIO0_9"] }
      ],
      notes: [
        "Physical/Board pin 26",
        "GPIO/BCM pin 7",
        "SoC pin B3"
      ]
    },
    "GPIO 1": {
      title: "GPIO 1 (HAT EEPROM i2c Clock)",
      functions: [
        { name: "Alt0", values: ["WKUP_I2C0_SCL"] },
        { name: "Alt7", values: ["MCU_GPIO0_19"] }
      ],
      notes: [
        "Physical/Board pin 28",
        "GPIO/BCM pin 1",
        "SoC pin B9"
      ],
      description: "These pins are generally reserved for i2c communication with an EEPROM. Connect those pins for auto configuration, if the board provides the feature (check the board description for details of EEPROM functionality)."
    },
    "GPIO 12": {
      title: "GPIO 12 (PWM0)",
      functions: [
        { name: "Alt0", values: ["SPI0_CS1"] },
        { name: "Alt1", values: ["CP_GEMAC_CPTS0_TS_COMP"] },
        { name: "Alt2", values: ["EHRPWM0_B"] },
        { name: "Alt3", values: ["ECAP0_IN_APWM_OUT"] },
        { name: "Alt5", values: ["MAIN_ERRORn"] },
        { name: "Alt7", values: ["GPIO1_16"] },
        { name: "Alt9", values: ["EHRPWM_TZn_IN5"] }
      ],
      notes: [
        "Physical/Board pin 32",
        "GPIO/BCM pin 12",
        "SoC pin C20"
      ],
      description: "The pin is usable as a GPIO, hardware PWM or the hardware PWM-ECAP peripheral."
    },
    "GPIO 16": {
      title: "GPIO 16",
      functions: [
        { name: "Alt0", values: ["MCASP0_AXR3"] },
        { name: "Alt1", values: ["SPI2_D0"] },
        { name: "Alt2", values: ["UART1_CTSn"] },
        { name: "Alt3", values: ["UART6_RXD"] },
        { name: "Alt5", values: ["ECAP1_IN_APWM_OUT"] },
        { name: "Alt7", values: ["GPIO1_7"] },
        { name: "Alt8", values: ["EQEP0_A"] }
      ],
      notes: [
        "Physical/Board pin 36",
        "GPIO/BCM pin 16",
        "SoC pin A25"
      ],
      description: "The pin is usable as a GPIO or the hardware PWM-ECAP peripheral."
    },
    "GPIO 20": {
      title: "GPIO 20 (PCM Data-In)",
      functions: [
        { name: "Alt0", values: ["MCASP0_AXR0"] },
        { name: "Alt2", values: ["AUDIO_EXT_REFCLK0"] },
        { name: "Alt6", values: ["EHRPWM1_B"] },
        { name: "Alt7", values: ["GPIO1_10"] },
        { name: "Alt8", values: ["EQEP0_I"] }
      ],
      notes: [
        "Physical/Board pin 38",
        "GPIO/BCM pin 20",
        "SoC pin F23"
      ],
      description: "GPIO 20 is used by PCM to input data from an I2S audio device, such as a microphone. The pin is also usable as a GPIO or hardware PWM."
    },
    "GPIO 21": {
      title: "GPIO 21 (PCM Data-Out)",
      functions: [
        { name: "Alt0", values: ["MCASP0_AXR1"] },
        { name: "Alt1", values: ["SPI2_CS2"] },
        { name: "Alt2", values: ["ECAP1_IN_APWM_OUT"] },
        { name: "Alt5", values: ["MAIN_ERRORn"] },
        { name: "Alt6", values: ["EHRPWM1_A"] },
        { name: "Alt7", values: ["GPIO1_9"] },
        { name: "Alt8", values: ["EQEP0_S"] }
      ],
      notes: [
        "Physical/Board pin 40",
        "GPIO/BCM pin 21",
        "SoC pin B25"
      ],
      description: "GPIO 21 is used by PCM to provide a data output signal to an external audio device such as a DAC chip. The pin is also usable as a GPIO, hardware PWM or the hardware PWM-ECAP peripheral."
    },
  };

  const PinDetails = ({ pin }: { pin: Pin }) => {
    const data = pinData[pin.name] || {
      title: pin.name,
      functions: [],
      notes: [
        `Physical/Board pin ${pin.number}`,
        `SoC pin ${pin.so_c || 'N/A'}`
      ],
      description: pin.description || "This pin is usable as a GPIO."
    };

    return (
      <article className="p-6 bg-white shadow-md rounded-lg max-w-full overflow-x-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 break-words">{data.title}</h1>

        {data.functions.length > 0 && (
          <div className="overflow-x-auto">
            <table className="table-auto w-full mb-4 border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  {data.functions.map((func) => (
                    <th
                      key={func.name}
                      className="border border-gray-300 px-2 py-2 whitespace-nowrap"
                    >
                      {func.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {data.functions.map((func) => (
                    <td
                      key={func.name}
                      className="border border-gray-300 px-2 py-2 break-words min-w-[100px]"
                    >
                      {func.values.join(", ")}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <ul className="list-disc list-inside text-gray-700 mb-4">
          {data.notes.map((note, index) => (
            <li key={index} className="break-words">{note}</li>
          ))}
        </ul>

        {data.description && (
          <p className="text-gray-700 mb-2 break-words">{data.description}</p>
        )}

        {data.learnMoreLink && (
          <p className="text-gray-700 break-words">
            <a href={data.learnMoreLink} className="text-blue-600 underline hover:text-blue-800">
              Learn more about {pin.type}
            </a>
          </p>
        )}
      </article>
    );
  };

  // const PinDetails = ({ pin }: { pin: Pin }) => {
  //   const data = pinData[pin.name] || {
  //     title: pin.name,
  //     functions: [],
  //     notes: [
  //       `Physical/Board pin ${pin.number}`,
  //       `SoC pin ${pin.so_c || 'N/A'}`
  //     ],
  //     description: pin.description || "This pin is usable as a GPIO."
  //   };

  //   return (
  //     <article className="p-6 bg-white shadow-md rounded-lg">
  //       <h1 className="text-2xl font-bold text-gray-800 mb-4">{data.title}</h1>

  //       {data.functions.length > 0 && (
  //         <div className="mb-4">
  //           <div className="flex flex-wrap gap-2 mb-2">
  //             {data.functions.map((func) => (
  //               <div key={func.name} className="bg-gray-100 p-2 rounded">
  //                 <span className="font-semibold">{func.name}:</span>
  //                 <div className="flex flex-wrap gap-1 mt-1">
  //                   {func.values.map((value, i) => (
  //                     <span key={i} className="bg-gray-200 px-2 py-1 rounded text-sm">
  //                       {value}
  //                     </span>
  //                   ))}
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       )}

  //       <ul className="list-disc list-inside text-gray-700 mb-4">
  //         {data.notes.map((note, index) => (
  //           <li key={index}>{note}</li>
  //         ))}
  //       </ul>

  //       {data.description && (
  //         <p className="text-gray-700 mb-2">{data.description}</p>
  //       )}

  //       {data.learnMoreLink && (
  //         <p className="text-gray-700">
  //           <a href={data.learnMoreLink} className="text-blue-600 underline hover:text-blue-800">
  //             Learn more about {pin.type}
  //           </a>
  //         </p>
  //       )}
  //     </article>
  //   );
  // };
  const getPinColor = (type: string) => {
    switch (type) {
      case 'pow3v3': return 'bg-[#B58900]';
      case 'pow5v': return 'bg-[#DC322F]';
      case 'gpio': return 'bg-[#859900]';
      case 'i2c': return 'bg-[#268BD2]';
      case 'spi': return 'bg-[#D33682]';
      case 'uart': return 'bg-[#6c71c4]';
      case 'pcm': return 'bg-[#2aa198]';
      case 'gnd': return 'bg-[#002B36]';
      default: return 'bg-[#002B36]';
    }
  };
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const [mode, setMode] = useState<string>("");
  const handlePinHover = (pinNumber: number) => {
    setHoveredPin(pinNumber);
  };

  const handlePinLeave = () => {
    setHoveredPin(null);
  };
  const isPinOfSelectedBus = (pin: Pin): boolean => {
    if (!mode) return false;

    // If a specific pin is selected, only highlight that pin
    if (selectedPin) {
      return pin.number === selectedPin.number && pin.name === selectedPin.name;
    }

    // Otherwise, highlight pins based on the selected bus
    switch (mode) {
      case 'SPI':
        return pin.SPI !== undefined;
      case '5v Power':
        return pin.type === 'pow5v';
      case '3v3 Power':
        return pin.type === 'pow3v3';
      case 'UART':
        return pin.UART !== undefined;
      case 'I2C':
        return pin.I2C !== undefined;
      case '1-WIRE':
        return pin['1-WIRE'] !== undefined;
      case 'GPIO':
        return pin.GPIO !== undefined;
      case 'JTAG*':
        return pin.JTAG !== undefined;
      case 'MCU':
        return pin.MCU !== undefined;
      case 'PWM':
        return pin.PWM !== undefined;
      case 'PCM':
        return pin.PCM !== undefined;
      case 'SoC Pin':
        return pin.socPin !== undefined;
      case 'Ground':
        return pin.type === 'gnd';
      default:
        return false;
    }
  };

  const handleBusSelect = (bus: string) => {
    setbus(bus);
    setMode(bus);
    setSelectedPin(null);
    router.push(`?bus=${encodeURIComponent(bus)}`);
  };
  const handlePinClick = (pinName: string, pinNumber: number) => {
    const clickedPin = [...leftPins, ...rightPins].find(pin =>
      pin.number === pinNumber && pin.name === pinName
    );

    if (clickedPin) {
      if (clickedPin.type === 'gnd' || clickedPin.type === 'pow5v' || clickedPin.type === 'pow3v3') {
        // For power/ground pins, set the bus mode and update URL
        setbus(clickedPin.name);
        setMode(clickedPin.name);
        setSelectedPin(null);
        router.push(`?bus=${encodeURIComponent(clickedPin.name)}`);
      } else {
        // For other pins, show pin details and update URL
        setbus('Pin Details');
        setMode('Pin Details');
        setSelectedPin(clickedPin);
        router.push(`?pin=${clickedPin.number}`);
      }
    }
  };

  const ArticleContent = () => {
    return (
      <article>
        <h1 className="text-3xl font-bold mb-4">Pinout!</h1>
        <h3 className="text-xl mb-6">The BeagleY-AI GPIO pinout guide.</h3>

        <p className="mb-4">
          This GPIO Pinout is an interactive reference to the BeagleY-AI GPIO pins, and a guide to the BeagleY-AI's GPIO interfaces.
          Pinout also includes <a href="/boards" className="text-blue-600 hover:underline">hundreds of pinouts for BeagleY-AI add-on boards, HATs and pHATs</a>.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">Support Pinout.xyz</h2>
        <p className="mb-4">If you love Pinout, please help me fund new features and improvements:</p>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-1">via GitHub at <a href="https://github.com/sponsors/gadgetoid" className="text-blue-600 hover:underline">GitHub.com/sponsors/gadgetoid</a></li>
          <li className="mb-1">via Patreon at <a href="https://www.patreon.com/gadgetoid" className="text-blue-600 hover:underline">Patreon.com/gadgetoid</a></li>
        </ul>
        <p className="mb-4">Every $1 makes all the difference! Thank you.</p>

        <h2 className="text-2xl font-bold mt-6 mb-2">What do these numbers mean?</h2>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-1">
            <strong>GPIO</strong> - General Purpose Input/Output, aka "BCM" or "Broadcom". These are the big numbers, e.g. "GPIO 22".
            You'll use these with RPi.GPIO and GPIO Zero.
          </li>
          <li className="mb-1">
            <strong>Physical</strong> - or "Board" correspond to the pin's physical location on the header. These are the small numbers
            next to the header, e.g. "Physical Pin 15".
          </li>
          <li className="mb-1">
            <strong>SoC</strong> - or "Schematic" pins that match the actual processor. These are shown as a tooltip when you mouse over a pin.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-6 mb-2">What's the orientation of this pinout?</h2>
        <p className="mb-4">
          Pinout depicts pin 1 in the top left corner. Pin 1 is the only pin with a square solder pad, which may only be visible from
          the underside of your BeagleY-AI. If you orient your BeagleY-AI such that you are looking at the top with the GPIO on the right
          and HDMI port(s) on the left, your orientation will match Pinout.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">More Resources</h2>
        <p className="font-bold mb-2">For Support:</p>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-1"><a href="https://docs.beagleboard.org/latest/boards/beagley/ai/index.html" className="text-blue-600 hover:underline">docs.BeagleBoard.org</a></li>
          <li className="mb-1"><a href="https://forum.beagleboard.org" className="text-blue-600 hover:underline">The BeagleBoard Forum</a></li>
          <li className="mb-1"><a href="https://beagleboard.org/discord" className="text-blue-600 hover:underline">Discord</a></li>
        </ul>

        <p className="font-bold mb-2">Software &amp; Design Files:</p>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-1"><a href="https://www.beagleboard.org/distros" className="text-blue-600 hover:underline">Software Images</a></li>
          <li className="mb-1"><a href="https://rcn-ee.net/rootfs/" className="text-blue-600 hover:underline">Software Images (nightly/experimental)</a></li>
          <li className="mb-1"><a href="https://openbeagle.org/beagley-ai/beagley-ai/" className="text-blue-600 hover:underline">Design Files</a></li>
        </ul>

        <p className="font-bold mb-2">Processor Documentation (AM67A):</p>
        <ul className="list-disc pl-5">
          <li className="mb-1"><a href="https://www.ti.com/lit/gpn/am67a" className="text-blue-600 hover:underline">Datasheet</a></li>
          <li className="mb-1"><a href="https://www.ti.com/lit/zip/sprujb3" className="text-blue-600 hover:underline">Technical Reference Manual</a></li>
        </ul>
      </article>
    );
  };
  return (
    <div className="min-h-screen bg-white text-gray-900 mt-2 items-center justify-center">

      <div className="container items-center justify-center mx-auto ">


        <div className="flex flex-col lg:flex-row gap-2  justify-center rounded-lg">
          {/* Left Column */}
          <div className="">
            {/* GPIO Pinout */}
            <div style={{ fontFamily: 'Avenir, sans-serif', color: '#073642', background: '#ffffff', marginBottom: '10px' }}>
              <Head>
                <title>BeagleY-AI GPIO Pinout</title>
                <meta name="description" content="The comprehensive add-on boards & GPIO Pinout guide for the BeagleY-AI" />
                <link rel="icon" href="/favicon.ico" />
              </Head>

              <header className="flex items-center p-4 ">
                <img src={beagleLogo.src} alt="Beagle Logo" className="w-12 h-12" />
                <h1 className="text-2xl font-bold">BeagleY-AI Pinout</h1>
              </header>
              <div className='rounded-lg relative w-[496px] min-h-[493px] bg-[#23B0E6]'>
                {/* Pin base */}
                <div
                  id="pinbase"
                  className='absolute left-[219px] w-[58px] h-[493px] bg-[#073642] top-0'
                ></div>

                {/* Bottom Pins (left side) */}
                <ul className='relative top-[7px] list-none block w-[248px] float-left p-0 m-0 bottom'>
                  {leftPins.map((pin) => (
                    <li
                      key={pin.number}
                      className={`pin${pin.number} ${pin.type}`}

                      onMouseEnter={() => handlePinHover(pin.number)}
                      onMouseLeave={handlePinLeave}
                    >
                      <a
                        onClick={() => { handlePinClick(pin.name, pin.number) }}
                        className={`block relative cursor-pointer text-[0.84em] leading-[22px] h-[22px] mb-[2px] 
  ${pin.type === 'gnd' ? 'text-[rgba(233,229,210,0.5)]' : 'text-[#E9E5D2]'} 
  w-[248px] no-underline  ${leftPins ? 'rounded-r-[13px]' : 'rounded-l-[13px]'}
  ${(hoveredPin === pin.number || isPinOfSelectedBus(pin)) ? 'bg-[#f5f3ed] text-black-500' : 'bg-transparent'}`}

                        title={pin.so_c ? `SoC pin ${pin.so_c}` : ''}
                      >
                        <span className='block'>
                          <span className={`absolute right-[32px] text-right text-[1.1em] opacity-80
              ${hoveredPin === pin.number || isPinOfSelectedBus(pin) ? 'text-[#063541]' : 'text-[#073642]'}`}>
                            {pin.number}
                          </span>
                          <span className={`inline-block pl-[10px]
              ${hoveredPin === pin.number || isPinOfSelectedBus(pin) ? 'text-[#063541]' :
                              (pin.type === 'gnd' ? 'text-[rgba(233,229,210,0.5)]' : 'text-[#E9E5D2]')}`}>
                            {pin.name}
                            {mode && mode in pin ? (<>
                              <small className={`text-[1em] ml-[4px] 
                  ${hoveredPin === pin.number || isPinOfSelectedBus(pin) ? 'text-[#063541]' :
                                  (pin.type === 'gnd' ? 'text-[rgba(233,229,210,0.5)]' : 'text-[#E9E5D2]')}`}>
                                ({pin[mode as keyof Pin]})
                              </small>
                            </>) : pin.altFunction ? (
                              <small className={`text-[1em] ml-[4px] 
                  ${hoveredPin === pin.number || isPinOfSelectedBus(pin) ? 'text-[#063541]' :
                                  (pin.type === 'gnd' ? 'text-[rgba(233,229,210,0.5)]' : 'text-[#E9E5D2]')}`}>
                                ({pin.altFunction})
                              </small>
                            ) : null}
                          </span>
                          <span
                            className={`block border border-transparent rounded-full w-[16px] h-[16px] absolute right-[4px] top-[2px] 
                ${getPinColor(pin.type)}`}
                          >
                            <span className='block rounded-full bg-[#FDF6E3] absolute left-[5px] top-[5px] w-[6px] h-[6px]'></span>
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Top Pins (right side) */}
                <ul className='relative top-[7px] list-none block w-[248px] float-right p-0 m-0 indent-[56px] top'>
                  {rightPins.map((pin) => (
                    <li
                      key={pin.number}
                      className={`pin${pin.number} ${pin.type}`}
                      onMouseEnter={() => handlePinHover(pin.number)}
                      onMouseLeave={handlePinLeave}
                    >
                      <a
                        onClick={() => { handlePinClick(pin.name, pin.number) }}
                        className={`block relative cursor-pointer text-[0.84em] leading-[22px] h-[22px] mb-[2px]  
  ${pin.type === 'gnd' ? 'text-[rgba(233,229,210,0.5)]' : 'text-[#E9E5D2]'} 
  w-[248px] no-underline  rounded-l-[13px]
  ${(hoveredPin === pin.number || isPinOfSelectedBus(pin)) ? 'bg-[#f5f3ed] text-black-500' : 'bg-transparent'}`}

                        title={pin.socPin ? `SoC pin ${pin.socPin}` : ''}
                      >
                        <span className='block'>
                          <span className={`absolute left-[32px] indent-0 text-[1.1em] opacity-80
              ${hoveredPin === pin.number || isPinOfSelectedBus(pin) ? 'text-[#063541]' : 'text-[#073642]'}`}>
                            {pin.number}
                          </span>
                          <span className={`block left-[2px] 
              ${hoveredPin === pin.number || isPinOfSelectedBus(pin) ? 'text-[#063541]' :
                              (pin.type === 'gnd' ? 'text-[rgba(233,229,210,0.5)]' : 'text-[#E9E5D2]')}`}>
                            {pin.name}
                            {mode && mode in pin ? (<>
                              <small className={`text-[1em] ml-[4px] 
                  ${hoveredPin === pin.number || isPinOfSelectedBus(pin) ? 'text-[#063541]' :
                                  (pin.type === 'gnd' ? 'text-[rgba(233,229,210,0.5)]' : 'text-[#E9E5D2]')}`}>
                                ({pin[mode as keyof Pin]})
                              </small>
                            </>) : pin.altFunction ? (
                              <small className={`text-[1em] ml-[4px] 
                  ${hoveredPin === pin.number || isPinOfSelectedBus(pin) ? 'text-[#063541]' :
                                  (pin.type === 'gnd' ? 'text-[rgba(233,229,210,0.5)]' : 'text-[#E9E5D2]')}`}>
                                ({pin.altFunction})
                              </small>
                            ) : null}
                          </span>
                          <span
                            className={`block border border-transparent rounded-full w-[16px] h-[16px] absolute left-[4px] top-[2px] 
                ${getPinColor(pin.type)}`}
                          >
                            <span className='block rounded-full bg-[#FDF6E3] absolute left-[5px] top-[5px] w-[6px] h-[6px]'></span>
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className='clear-both'></div>
              </div>
            </div>
            {/* Legend */}
            <div className="bg-gray-100 p-4 rounded-lg" style={{ width: '496px', margin: '0 auto' }}>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-2/3">
                  <h2 className="text-xl font-bold mb-2">Legend</h2>
                  <p className="text-sm mb-4">Orientate your BeagleY-AI with the GPIO on the right and the HDMI port(s) on the left.</p>

                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center mr-2">
                        <span className="w-2 h-2 rounded-full bg-white"></span>
                      </span>
                      <span>GPIO (General Purpose IO)</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 rounded-full bg-pink-600 flex items-center justify-center mr-2">
                        <span className="w-2 h-2 rounded-full bg-white"></span>
                      </span>
                      <span>SPI (Serial Peripheral Interface)</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                        <span className="w-2 h-2 rounded-full bg-white"></span>
                      </span>
                      <span>I²C (Inter-integrated Circuit)</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center mr-2">
                        <span className="w-2 h-2 rounded-full bg-white"></span>
                      </span>
                      <span>UART (Universal Asynchronous Receiver/Transmitter)</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 rounded-full bg-teal-600 flex items-center justify-center mr-2">
                        <span className="w-2 h-2 rounded-full bg-white"></span>
                      </span>
                      <span>PCM (Pulse Code Modulation)</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 rounded-full bg-gray-800 flex items-center justify-center mr-2">
                        <span className="w-2 h-2 rounded-full bg-white"></span>
                      </span>
                      <span>Ground</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center mr-2">
                        <span className="w-2 h-2 rounded-full bg-white"></span>
                      </span>
                      <span>5v (Power)</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 rounded-full bg-yellow-600 flex items-center justify-center mr-2">
                        <span className="w-2 h-2 rounded-full bg-white"></span>
                      </span>
                      <span>3.3v (Power)</span>
                    </li>
                  </ul>

                  <p className="text-sm mt-4"><b>(*)</b> Denotes pins that differ in functionality on BeagleY-AI as compared to Raspberry Pi 4/5</p>
                </div>

                <div className="md:w-1/3 flex justify-center" style={{ width: '196px', height: '297px' }}>
                  <img src={beagleOrientation.src} alt="BeagleY-AI Orientation" className="w-48 h-auto" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/2">
            {/* Interfaces */}
            <div className="bg-indigo-700 p-2 rounded-lg mb-2">
              <ul className="flex flex-wrap gap-1 justify-end">
                {['GPCLK*', 'MCU', 'GPIO', 'JTAG*', 'Ground', 'PWM', 'SDIO*', 'PCM', '1-WIRE', 'I2C', 'DPI*', 'UART', '3v3 Power', '5v Power', 'SPI', 'SoC Pin'].map((item) => (
                  <li key={item}>
                    <a onClick={() => handleBusSelect(item)}
                      className={`inline-block px-3 py-1 cursor-pointer text-xs ${mode === item ? 'bg-indigo-200 text-indigo-700' : 'bg-indigo-600 text-white'} rounded hover:bg-indigo-200 hover:text-indigo-700 transition-colors`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg min-h-[1000px]">

              {mode === 'Pin Details' && selectedPin ? (
                <PinDetails pin={selectedPin} />
              ) : mode ? (
                (() => {
                  const busContent = {
                    "GPCLK*": (
                      <article className="page_gpclk">
                        <h1 className="text-[2rem] font-bold">GPCLK - General Purpose Clock*</h1>
                        <p>General Purpose Clock pins can be set up to output a fixed frequency without any ongoing software control.</p>
                        <p><strong>(*) - GPCLK is not available on the 40 Pin Header on BeagleY-AI. CLK Outputs are only available from test pads and/or PCIe/CSI Headers</strong></p>
                      </article>
                    ),
                    "MCU": (
                      <article className="page_mcu px-4 py-6 text-black">
                        <h1 className="text-2xl font-bold mb-4">MCU - R5 Microcontroller Subsystem Pins</h1>

                        <p className="mb-2">
                          The AM67A SoC Inside BeagleY-AI also features R5 MCU cores which are able to act independently
                          of the Cortex A53 which normally run Linux.
                        </p>

                        <p className="mb-2">
                          You can use the R5 MCU to run Zephyr, MicroPython and much more without having to worry<sup>*</sup> about what other parts of the system are doing!
                        </p>

                        <p className="mb-6">
                          The pins shown in this section are connected directly to the MCU cores, however, you can control
                          any system pin from any core at the expense of some small amount of latency.
                        </p>

                        <div className="details">
                          <h2 className="text-xl font-semibold mb-2">Details</h2>
                          <ul className="list-disc list-inside">
                            <li>Uses 9 GPIO pins</li>
                          </ul>
                        </div>
                      </article>
                    ),
                    "GPIO": (
                      <article className="page_gpio px-4 py-6 text-black">
                        <h1 className="text-2xl font-bold mb-4">GPIO Pins</h1>

                        <p className="mb-2">
                          GPIO stands for General-Purpose Input/Output. It’s a set of programmable pins that you can use to connect and control various electronic components.
                        </p>

                        <p className="mb-6">
                          You can set each pin to either read signals (input) from things like buttons and sensors or send signals (output) to things like LEDs and motors. This lets you interact with and control the physical world using code!
                        </p>

                        <div className="details">
                          <h2 className="text-xl font-semibold mb-2">Details</h2>
                          <ul className="list-disc list-inside">
                            <li>HAT form-factor</li>
                            <li>Uses 28 GPIO pins</li>
                            <li>
                              <a
                                href="https://docs.beagleboard.org/latest/boards/beagley/ai/demos/beagley-ai-using-gpio.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline hover:text-blue-800"
                              >
                                More Information
                              </a>
                            </li>
                          </ul>
                        </div>
                      </article>
                    ),
                    "I2C": (
                      <article className="page_i2c px-4 py-6 text-black">
                        <h1 className="text-2xl font-bold mb-4">I2C - Inter Integrated Circuit</h1>

                        <p className="mb-2">
                          GPIO 2 and GPIO 3 – BeagleY-AI's I2C1 pins – allow for two-wire communication with a variety of external sensors and devices.
                        </p>

                        <p className="mb-2">
                          The I2C pins include a fixed 2.2 kΩ pull-up resistor to 3.3v. They are not suitable for use as general purpose IO where a pull-up might interfere.
                        </p>

                        <p className="mb-2">
                          I2C is a multi-drop bus, multiple devices can be connected to these same two pins. Each device has its own unique I2C address.
                        </p>

                        <p className="mb-2">
                          You can verify the address of connected I2C peripherals with a simple one-liner:
                        </p>

                        <pre className="bg-gray-100 p-4 rounded mb-4 text-sm overflow-x-auto">
                          <code className="language-bash block whitespace-pre">
                            {`sudo apt-get install i2c-tools
sudo i2cdetect -y 1`}
                          </code>
                        </pre>

                        <p className="mb-2">
                          You can then access I2C from Python using the smbus library:
                        </p>

                        <pre className="bg-gray-100 p-4 rounded mb-6 text-sm overflow-x-auto">
                          <code className="block whitespace-pre text-black">
                            import smbus
                            {"\n"}DEVICE_BUS = 1
                            {"\n"}DEVICE_ADDR = 0x15
                            {"\n"}bus = smbus.SMBus(DEVICE_BUS)
                            {"\n"}bus.write_byte_data(DEVICE_ADDR, 0x00, 0x01)
                          </code>
                        </pre>
                        <p className="mb-2">
                          On BeagleY-AI, GPIO 0 and GPIO 1 are shared by the PMIC, Core Rail DCDC converter, Board ID EEPROM and External RTC and exposed as I2C0 – while they can be used as an alternate I2C bus, this is actively discouraged unless you are an advanced user and know what you're doing.
                        </p>

                        <p className="mb-6">
                          (*) BeagleY-AI can make an additional I2C interface available (I2C4) via Header Pins 15 and 22 respectively.
                        </p>

                        <div className="details">
                          <h2 className="text-xl font-semibold mb-2">Details</h2>
                          <ul className="list-disc list-inside">
                            <li>
                              <a
                                href="http://www.raspberry-projects.com/pi/programming-in-python/i2c-programming-in-python/using-the-i2c-interface-2"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline hover:text-blue-800"
                              >
                                More Information
                              </a>
                            </li>
                          </ul>
                        </div>
                      </article>

                    ),
                    "SPI": (
                      <article className="page_spi px-4 py-6 text-black">
                        <h1 className="text-2xl font-bold mb-4">SPI - Serial Peripheral Interface</h1>
                        <hr className="mb-4 border-gray-400" />

                        <p className="mb-2">
                          Known as the four-wire serial bus, SPI lets you attach multiple compatible devices to a single set of pins
                          by assigning them different chip-select pins.
                        </p>

                        <p className="mb-2">
                          To talk to an SPI device, you assert its corresponding chip-select pin.
                        </p>

                        <p className="mb-2">
                          By default the BeagleY allows you to use SPI0 with chip select pins on CE0 on GPIO 8 and CE1 on GPIO 7.
                        </p>

                        <p className="mb-2 font-semibold text-red-600">
                          NOTE — For compatibility reasons, BeagleY-AI uses Software SPI and Symlinks to match the Raspberry Pi.
                          Additional HW SPI resources are available for advanced users.
                        </p>
                      </article>
                    ),
                    "UART": (
                      <article className="page_uart px-4 py-6 text-black">
                        <h1 className="text-2xl font-bold mb-4">UART - Universal Asynchronous Receiver/Transmitter</h1>
                        <hr className="mb-4 border-gray-400" />

                        <p className="mb-2">
                          UART is an asynchronous serial communication protocol, meaning that it takes bytes of data and
                          transmits the individual bits in a sequential fashion.
                        </p>

                        <p className="mb-2">
                          Asynchronous transmission allows data to be transmitted without the sender having to send a clock signal
                          to the receiver. Instead, the sender and receiver agree on timing parameters in advance and special bits
                          called 'start bits' are added to each word and used to synchronize the sending and receiving units.
                        </p>

                        <p className="mb-2">
                          UART is commonly used on the BeagleY-AI as a convenient way to control it over the GPIO, or access the kernel
                          boot messages from the serial console (enabled by default).
                        </p>

                        <p className="mb-6">
                          It can also be used as a way to interface an Arduino, bootloaded ATmega, ESP8266, etc with your BeagleY-AI.
                          Be careful with logic-levels between the devices though—for example, the Beagle is 3.3v and the Arduino is 5v.
                          Connecting the two without a logic level translator will damage your BeagleY-AI!
                        </p>

                        <div className="details">
                          <h2 className="text-xl font-semibold mb-2">Details</h2>
                          <ul className="list-disc list-inside">
                            <li>18 pin header</li>
                            <li>Uses 18 GPIO pins</li>
                          </ul>
                        </div>
                      </article>

                    ),
                    "PCM": (
                      <article className="page_pcm px-4 py-6 text-black">
                        <h1 className="text-2xl font-bold mb-4">PCM - Pulse-code Modulation</h1>

                        <p className="mb-2">
                          PCM (Pulse-code Modulation) is a digital representation of sampled analog. On BeagleY-AI it's a form of
                          digital audio output which can be understood by a DAC for high quality sound.
                        </p>

                        <p className="mb-2">
                          By default, PCM is available on HW Pins 12, 35, 38, and 40.
                        </p>

                        <p className="mb-6">
                          (*) - BeagleY-AI provides significantly more McASP muxing options than what is normally available.
                        </p>

                        <div className="details">
                          <h2 className="text-xl font-semibold mb-2">Details</h2>
                          <ul className="list-disc list-inside">
                            <li>Uses 12 GPIO pins</li>
                          </ul>
                        </div>
                      </article>
                    ),
                    "DPI*": (<article className="page_dpi px-4 py-6 text-black">
                      <h1 className="text-2xl font-bold mb-4">DPI - Display Parallel Interface</h1>
                      <p className="mb-2">
                        The DPI Interface on BeagleY-AI is used by the RGB to HDMI framer.
                      </p>
                      <p className="font-semibold text-red-600">
                        (*) - DPI is not available on the 40 Pin Header on BeagleY-AI. HATs that require DPI are not compatible.
                      </p>
                    </article>
                    ),
                    "1-WIRE": (
                      <article className="page_1_wire px-4 py-6 text-black">
                        <h1 className="text-2xl font-bold mb-4">W1-GPIO - One-Wire Interface</h1>
                        <p className="mb-6">
                          One-wire is a single-wire communication bus typically used to connect sensors.
                        </p>

                        <div className="details">
                          <h2 className="text-xl font-semibold mb-2">Details</h2>
                          <ul className="list-disc list-inside">
                            <li>
                              <a
                                href="https://www.kernel.org/doc/Documentation/w1/w1.generic"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline hover:text-blue-800"
                              >
                                More Information
                              </a>
                            </li>
                          </ul>
                        </div>
                      </article>
                    ),
                    "SDIO*": (
                      <article className="page_sdio px-4 py-6 text-black">
                        <h1 className="text-2xl font-bold mb-4">SDIO - SD Card Interface (*)</h1>
                        <p className="mb-2">
                          SDIO is the SD host/eMMC interface on the BeagleY-AI. SD host signals are normally used for the microSD slot.
                        </p>
                        <p className="font-semibold text-red-600">
                          (*) - SDIO is not available on the 40 Pin Header on BeagleY-AI.
                        </p>
                      </article>
                    ),
                    "PWM": (
                      <article className="page_pwm px-4 py-6 ">
                        <h1 className="text-2xl font-bold mb-4">PWM - Pulse-width Modulation</h1>
                        <p className="mb-2">
                          PWM (Pulse-width Modulation) is a method of creating an analog voltage
                          by toggling a digital pin on and off.
                        </p>
                        <p className="mb-6">
                          The GPIOs map to the Hardware PWM peripherals as such:
                        </p>

                        <div className="overflow-auto">
                          <table className="table-auto border border-black mx-auto text-sm mb-6">
                            <thead>
                              <tr>
                                <th className="border border-black px-6 py-2" />
                                <th className="border border-black px-6 py-2" colSpan={2}>
                                  <b>PWM0</b>
                                </th>
                                <th className="border border-black px-6 py-2" colSpan={2}>
                                  <b>PWM1</b>
                                </th>
                                <th className="border border-black px-6 py-2" colSpan={3}>
                                  <b>ECAP</b>
                                </th>
                              </tr>
                              <tr>
                                <td className="border border-black px-6 py-2" />
                                <td className="border border-black px-6 py-2">
                                  <b>A</b>
                                </td>
                                <td className="border border-black px-6 py-2">
                                  <b>B</b>
                                </td>
                                <td className="border border-black px-6 py-2">
                                  <b>A</b>
                                </td>
                                <td className="border border-black px-6 py-2">
                                  <b>B</b>
                                </td>
                                <td className="border border-black px-6 py-2">
                                  <b>0</b>
                                </td>
                                <td className="border border-black px-6 py-2">
                                  <b>1</b>
                                </td>
                                <td className="border border-black px-6 py-2">
                                  <b>2</b>
                                </td>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                ["GPIO5", "X", "", "", "", "", "", ""],
                                ["GPIO6", "", "", "X", "", "", "", ""],
                                ["GPIO12", "", "X", "", "", "X", "", ""],
                                ["GPIO13", "", "", "", "X", "", "", ""],
                                ["GPIO14", "", "X", "", "", "", "", ""],
                                ["GPIO15", "X", "", "", "", "", "", ""],
                                ["GPIO16", "", "", "", "", "", "X", ""],
                                ["GPIO17", "", "", "", "", "", "", "X"],
                                ["GPIO18", "", "", "", "", "", "", "X"],
                                ["GPIO20", "", "", "", "X", "", "", ""],
                                ["GPIO21", "", "", "X", "", "", "X", ""],
                              ].map((row, i) => (
                                <tr key={i}>
                                  {row.map((cell, j) => (
                                    <td
                                      key={j}
                                      className="border border-black text-center px-6 py-1"
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="details mt-6">
                          <h2 className="text-xl font-semibold mb-2">Details</h2>
                          <ul className="list-disc list-inside">
                            <li>Uses 12 GPIO pins</li>
                          </ul>
                        </div>
                      </article>
                    ),
                    "JTAG*": (
                      <article className="page_jtag px-4 py-6 text-black">
                        <h1 className="text-2xl font-bold mb-4">JTAG - Joint Test Action Group</h1>

                        <p className="mb-2">
                          JTAG is a standardized interface for debugging integrated circuits which you can use to debug your BeagleY-AI.
                        </p>

                        <p className="font-semibold text-red-600 mb-2">
                          (*) - JTAG is not available on the 40 Pin Header on BeagleY-AI. The interface is instead available via the TagConnect 10 pin connector under the USB Type-A ports.
                        </p>

                        <p>
                          Due to space constraints, the original retaining clips will not fit, but a 3D printable version is{" "}
                          <a
                            href="https://www.printables.com/model/879533-beagley-ai-tagconnect-clip-10pin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            available on Printables
                          </a>.
                        </p>
                      </article>
                    ),
                    "Ground": (
                      <article className="page_ground px-4 py-6 text-black">
                        <h1 className="text-2xl font-bold mb-4">Ground</h1>

                        <p className="mb-2">
                          The Ground pins on BeagleY-AI are all electrically connected, so it doesn't matter
                          which one you use if you're wiring up a voltage supply.
                        </p>

                        <p className="mb-2">
                          Generally the one that's most convenient or closest to the rest of your connections is tidier
                          and easier, or alternatively the one closest to the supply pin that you use.
                        </p>

                        <p>
                          For example, it's a good idea to use Physical Pin 17 for 3v3 and Physical Pin 25 for ground when using
                          the SPI connections, as these are right next to the important pins for SPI0.
                        </p>
                      </article>
                    ),
                    "3v3 Power": (
                      <article className="page_3v3_power px-4 py-6 text-black">
                        <h1 className="text-2xl font-bold mb-4">3v3 Power</h1>

                        <p className="mb-2">
                          BeagleY-AI generates its 3v3 power from Buck 1 of the TPS65129 PMIC, meaning that it has up to 3.5A of current available.
                        </p>

                        <p className="mb-2">
                          This rail is shared with other on-board peripherals such as the HDMI framer, USB hub and Ethernet PHY, so expect to have about 500mA usable.
                        </p>

                        <p>
                          An external supply coupled with a 3v3 regulator is recommended for powering 3.3v projects.
                        </p>
                      </article>
                    ),
                    "5v Power": (
                      <article className="page_5v_power px-4 py-6 text-black">
                        <h1 className="text-2xl font-bold mb-4">5v Power</h1>

                        <p className="mb-2">
                          The 5v power pins are connected directly to the BeagleY-AI power input and will capably provide the full supply current of your mains adapter, minus that used by the BeagleY-AI itself.
                        </p>

                        <p>
                          With a decent USB-C PD power supply, you can expect to pull about 1.5A depending on peripheral load.
                          Devices that require high current — such as LED panels, long LED strips, or motors — should use an external power supply.
                        </p>
                      </article>
                    ),
                    "SoC Pin": (
                      <article className="page_soc_pin px-4 py-6 text-black">
                        <h1 className="text-2xl font-bold mb-4">SoC Pins</h1>

                        <p className="mb-2">
                          SoC Pins are the raw pin names from the AM67A SoC.
                        </p>

                        <p className="mb-2">
                          This nomenclature is useful when referencing the schematic or creating device trees and other advanced uses.
                        </p>

                        <p className="mb-6">
                          You can explore more details of what each pin is capable of in the device Datasheet and Technical Reference Manual.
                        </p>

                        <div className="details">
                          <h2 className="text-xl font-semibold mb-2">Details</h2>
                          <ul className="list-disc list-inside">
                            <li>HAT form-factor</li>
                            <li>
                              <a
                                href="https://www.ti.com/lit/ds/symlink/am67a.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline hover:text-blue-800"
                              >
                                More Information
                              </a>
                            </li>
                          </ul>
                        </div>
                      </article>
                    )
                  };

                  if (gpio in busContent) {
                    return (
                      <div id="content">
                        <div id="featured">
                          <ul></ul>
                        </div>
                        {busContent[gpio as BusType]}
                        <div id="lang"></div>
                      </div>
                    );
                  }


                })()
              ) : (
                <ArticleContent />
              )}
            </div>

          </div>
        </div>

        <footer className="mt-8 text-center py-4">
          <p>
            Spotted an error, want to add your board's pinout?{' '}
            <a href="https://openbeagle.org/pinout/pinout.beagleboard.io" className="text-blue-600 hover:underline">
              Contribute at OpenBeagle
            </a>
          </p>
        </footer>
      </div>
    </div >
  );
};

export default BeagleYAI;