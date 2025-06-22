"use client";
import Head from 'next/head';
import React, { useState } from 'react';
import beagleLogo from './pinout-beagle-logo.png';
import beagleOrientation from './beagley-orientation.png';

interface Pin {
  number: number;
  name: string;
  type: 'gpio' | 'pow3v3' | 'pow5v' | 'gnd' | 'i2c' | 'spi' | 'uart' | 'pcm';
  description?: string;
  socPin?: string;
  altFunction?: string;
}

const BeagleYAI = () => {
  const leftPins: Pin[] = [
    { number: 1, name: '3v3 Power', type: 'pow3v3' },
    { number: 3, name: 'GPIO 2', type: 'i2c', altFunction: 'I2C1 SDA', socPin: 'E11' },
    { number: 5, name: 'GPIO 3', type: 'i2c', altFunction: 'I2C1 SCL', socPin: 'B13' },
    { number: 7, name: 'GPIO 4', type: 'gpio', socPin: 'W26' },
    { number: 9, name: 'Ground', type: 'gnd' },
    { number: 11, name: 'GPIO 17', type: 'gpio', socPin: 'A26' },
    { number: 13, name: 'GPIO 27', type: 'gpio', socPin: 'N22' },
    { number: 15, name: 'GPIO 22', type: 'gpio', socPin: 'R27' },
    { number: 17, name: '3v3 Power', type: 'pow3v3' },
    { number: 19, name: 'GPIO 10', type: 'spi', altFunction: 'SPI0 MOSI', socPin: 'B12' },
    { number: 21, name: 'GPIO 9', type: 'spi', altFunction: 'SPI0 MISO', socPin: 'C11' },
    { number: 23, name: 'GPIO 11', type: 'spi', altFunction: 'SPI0 SCLK', socPin: 'A9' },
    { number: 25, name: 'Ground', type: 'gnd' },
    { number: 27, name: 'GPIO 0', type: 'i2c', altFunction: 'EEPROM SDA', socPin: 'D11' },
    { number: 29, name: 'GPIO 5', type: 'gpio', socPin: 'B20' },
    { number: 31, name: 'GPIO 6', type: 'gpio', socPin: 'D20' },
    { number: 33, name: 'GPIO 13', type: 'gpio', altFunction: 'PWM1', socPin: 'E19' },
    { number: 35, name: 'GPIO 19', type: 'pcm', altFunction: 'PCM FS', socPin: 'C26' },
    { number: 37, name: 'GPIO 26', type: 'gpio', socPin: 'P26' },
    { number: 39, name: 'Ground', type: 'gnd' },
  ];

  const rightPins: Pin[] = [
    { number: 2, name: '5v Power', type: 'pow5v' },
    { number: 4, name: '5v Power', type: 'pow5v' },
    { number: 6, name: 'Ground', type: 'gnd' },
    { number: 8, name: 'GPIO 14', type: 'uart', altFunction: 'UART TX', socPin: 'F24' },
    { number: 10, name: 'GPIO 15', type: 'uart', altFunction: 'UART RX', socPin: 'C27' },
    { number: 12, name: 'GPIO 18', type: 'pcm', altFunction: 'PCM CLK', socPin: 'D25' },
    { number: 14, name: 'Ground', type: 'gnd' },
    { number: 16, name: 'GPIO 23', type: 'gpio', socPin: 'B5' },
    { number: 18, name: 'GPIO 24', type: 'gpio', socPin: 'C8' },
    { number: 20, name: 'Ground', type: 'gnd' },
    { number: 22, name: 'GPIO 25', type: 'gpio', socPin: 'P21' },
    { number: 24, name: 'GPIO 8', type: 'spi', altFunction: 'SPI0 CE0', socPin: 'C12' },
    { number: 26, name: 'GPIO 7', type: 'spi', altFunction: 'SPI0 CE1', socPin: 'B3' },
    { number: 28, name: 'GPIO 1', type: 'i2c', altFunction: 'EEPROM SCL', socPin: 'B9' },
    { number: 30, name: 'Ground', type: 'gnd' },
    { number: 32, name: 'GPIO 12', type: 'gpio', altFunction: 'PWM0', socPin: 'C20' },
    { number: 34, name: 'Ground', type: 'gnd' },
    { number: 36, name: 'GPIO 16', type: 'gpio', socPin: 'A25' },
    { number: 38, name: 'GPIO 20', type: 'pcm', altFunction: 'PCM DIN', socPin: 'F23' },
    { number: 40, name: 'GPIO 21', type: 'pcm', altFunction: 'PCM DOUT', socPin: 'B25' },
  ];
  const [gpio, setbus] = useState<string | null>(null);
  const getPinColor = (type: string) => {
    switch (type) {
      case 'pow3v3': return '#B58900';
      case 'pow5v': return '#DC322F';
      case 'gpio': return '#859900';
      case 'i2c': return '#268BD2';
      case 'spi': return '#D33682';
      case 'uart': return '#6c71c4';
      case 'pcm': return '#2aa198';
      case 'gnd': return '#002B36';
      default: return '#002B36';
    }
  };
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);

  const handlePinHover = (pinNumber: number) => {
    setHoveredPin(pinNumber);
  };

  const handlePinLeave = () => {
    setHoveredPin(null);
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
              <div className='rounded-lg ' style={{
                position: 'relative',
                width: '496px',
                minHeight: '493px',
                background: '#23B0E6',
              }}>
                <div id="pinbase" style={{
                  position: 'absolute',
                  left: '219px',
                  width: '58px',
                  height: '493px',
                  background: '#073642',
                  top: '0px'
                }}></div>

                {/* Bottom Pins (left side) */}
                <ul style={{
                  position: 'relative',
                  top: '7px',
                  listStyle: 'none',
                  display: 'block',
                  width: '248px',
                  float: 'left',
                  padding: 0,
                  margin: 0
                }} className="bottom">
                  {leftPins.map((pin) => (
                    <li
                      key={pin.number}
                      className={`pin${pin.number} ${pin.type}`}
                      style={{
                        margin: 0,
                        padding: 0,
                        backgroundColor: hoveredPin === pin.number ? 'rgba(200, 0, 0, 0.6)' : 'transparent'
                      }}
                      onMouseEnter={() => handlePinHover(pin.number)}
                      onMouseLeave={handlePinLeave}
                    >
                      <a
                        href={`/pinout/pin${pin.number}_${pin.name.toLowerCase().replace(' ', '_')}`}
                        style={{
                          display: 'block',
                          position: 'relative',
                          fontSize: '0.84em',
                          lineHeight: '22px',
                          height: '22px',
                          marginBottom: '2px',
                          color: pin.type === 'gnd' ? 'rgba(233, 229, 210, 0.5)' : '#E9E5D2',
                          width: '248px',
                          textDecoration: 'none',
                          paddingLeft: '10px',
                          borderTopRightRadius: '13px',
                          borderBottomRightRadius: '13px',
                          backgroundColor: hoveredPin === pin.number ? '#f5f3ed' : 'transparent'
                        }}
                        title={pin.socPin ? `SoC pin ${pin.socPin}` : ''}
                      >
                        <span className="default" style={{ display: 'block' }}>
                          <span className="phys" style={{
                            color: hoveredPin === pin.number ? '#FFFFFF' : '#073642',
                            fontSize: '1.1em',
                            opacity: 0.8,
                            position: 'absolute',
                            right: '32px',
                            textAlign: 'right'
                          }}>{pin.number}</span>
                          <span className="name" style={{
                            display: 'inline-block',
                            color: hoveredPin === pin.number ? '#063541' : (pin.type === 'gnd' ? 'rgba(233, 229, 210, 0.5)' : '#E9E5D2')
                          }}>
                            {pin.name}
                            {pin.altFunction && (
                              <small style={{
                                fontSize: '1.1em',
                                marginLeft: '4px',
                                color: hoveredPin === pin.number ? '#063541' : (pin.type === 'gnd' ? 'rgba(233, 229, 210, 0.5)' : '#E9E5D2')
                              }}>
                                ({pin.altFunction})
                              </small>
                            )}
                          </span>
                          <span className="pin" style={{
                            display: 'block',
                            border: '1px solid transparent',
                            borderRadius: '50%',
                            width: '16px',
                            height: '16px',
                            background: getPinColor(pin.type),
                            position: 'absolute',
                            right: '4px',
                            top: '2px'
                          }}>
                            <span style={{
                              display: 'block',
                              borderRadius: '100%',
                              background: '#FDF6E3',
                              position: 'absolute',
                              left: '5px',
                              top: '5px',
                              width: '6px',
                              height: '6px'
                            }}></span>
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Top Pins (right side) */}
                <ul style={{
                  position: 'relative',
                  top: '7px',
                  listStyle: 'none',
                  display: 'block',
                  width: '248px',
                  float: 'right',
                  padding: 0,
                  margin: 0,
                  textIndent: '56px'
                }} className="top">
                  {rightPins.map((pin) => (
                    <li
                      key={pin.number}
                      className={`pin${pin.number} ${pin.type}`}
                      style={{
                        margin: 0,
                        padding: 0,
                        backgroundColor: hoveredPin === pin.number ? 'rgba(200, 0, 0, 0.6)' : 'transparent'
                      }}
                      onMouseEnter={() => handlePinHover(pin.number)}
                      onMouseLeave={handlePinLeave}
                    >
                      <a
                        href={`/pinout/pin${pin.number}_${pin.name.toLowerCase().replace(' ', '_')}`}
                        style={{
                          display: 'block',
                          position: 'relative',
                          fontSize: '0.84em',
                          lineHeight: '22px',
                          height: '22px',
                          marginBottom: '2px',
                          color: pin.type === 'gnd' ? 'rgba(233, 229, 210, 0.5)' : '#E9E5D2',
                          width: '248px',
                          textDecoration: 'none',
                          borderTopLeftRadius: '13px',
                          borderBottomLeftRadius: '13px',
                          backgroundColor: hoveredPin === pin.number ? '#f5f3ed' : 'transparent'
                        }}
                        title={pin.socPin ? `SoC pin ${pin.socPin}` : ''}
                      >
                        <span className="default" style={{ display: 'block' }}>
                          <span className="phys" style={{
                            color: hoveredPin === pin.number ? '#FFFFFF' : '#073642',
                            fontSize: '1.1em',
                            opacity: 0.8,
                            position: 'absolute',
                            left: '32px',
                            textIndent: '0'
                          }}>{pin.number}</span>
                          <span className="name" style={{
                            display: '',
                            left: '2px',
                            color: hoveredPin === pin.number ? '#063541' : (pin.type === 'gnd' ? 'rgba(233, 229, 210, 0.5)' : '#E9E5D2')
                          }}>
                            {pin.name}
                            {pin.altFunction && (
                              <small style={{
                                fontSize: '1.1em',
                                marginLeft: '4px',
                                color: hoveredPin === pin.number ? '#063541' : (pin.type === 'gnd' ? 'rgba(233, 229, 210, 0.5)' : '#E9E5D2')
                              }}>
                                ({pin.altFunction})
                              </small>
                            )}
                          </span>
                          <span className="pin" style={{
                            display: 'block',
                            border: '1px solid transparent',
                            borderRadius: '50%',
                            width: '16px',
                            height: '16px',
                            background: getPinColor(pin.type),
                            position: 'absolute',
                            left: '4px',
                            top: '2px'
                          }}>
                            <span style={{
                              display: 'block',
                              borderRadius: '100%',
                              background: '#FDF6E3',
                              position: 'absolute',
                              left: '5px',
                              top: '5px',
                              width: '6px',
                              height: '6px'
                            }}></span>
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div style={{ clear: 'both' }}></div>

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
                    <a onClick={() => { setbus(item) }}
                      className="inline-block px-3 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-200 hover:text-indigo-700 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg min-h-[1000px]">

              {
                gpio==="GPCLK*" ? (
                  <div id="content">
                    <div id="featured">
                      <ul></ul>
                    </div>

                    <article className="page_gpclk">
                      <h1 className='text-[2rem] font-bold'>GPCLK - General Purpose CLock*</h1>
                      <p>
                        General Purpose Clock pins can be set up to output a fixed frequency
                        without any ongoing software control.
                      </p>
                      <p>
                        <strong>
                          (*) - GPCLK is not available on the 40 Pin Header on BeagleY-AI.
                          CLK Outputs are only available from test pads and/or PCIe/CSI Headers
                        </strong>
                      </p>
                    </article>

                    <div id="lang"></div>
                  </div>
                ) : (
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
                )
              }
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