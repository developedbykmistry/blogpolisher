"use client"

import { search } from "@/api/query";
import { useState, useRef, useEffect } from "react";
import { AiOutlineTwitter } from 'react-icons/ai'
import { AiOutlineInstagram } from 'react-icons/ai'
import { AiOutlineGithub } from 'react-icons/ai'
import { FaLinkedin } from 'react-icons/fa'

export default function Home() {

  const [prompt, setPrompt] = useState("")
  
  const [languageManner, setLanguageManner] = useState("Normal")
  const [wordCount, setWordCount] = useState(100)
  const [keyword, setKeyword] = useState("")
  const [keywords, setKeywords] = useState([])

  const [result, setResult] = useState("")

  const [showMenu, setShowMenu] = useState(true)

  const inputRef = useRef("")
  const [responsive, setResponsive] = useState(false)

  const languages = ["💼 Professional", "🤝 Friendly", "📚 Educative", "🤭 Sarcastic"]

  useEffect(() => {
    window.innerWidth >= 500 ? setResponsive(false) : setResponsive(true)
  }, [])  

  useEffect(() => {
    inputRef.current.addEventListener('keypress', (e) => {
      if(e.key === "Enter"){
        const trimmedKeyword = e.target.value.trim();
        if(trimmedKeyword !== ''){
          setKeywords(prev => [...prev, trimmedKeyword]);
          setKeyword("");
        }
      }
    });
  }, [inputRef.current.value]);

  function copyText() {
    navigator.clipboard.writeText(result)
  }

  function removeKeyword(e) {
    setKeywords(keywords.filter(keyword => {
      return keyword !== e.target.innerHTML
    }))
  }

  function changeLanguageManner(e) {
    languageManner == e ? setLanguageManner(null) : setLanguageManner(e)
    
  }
    
  function submit() { 
    if(prompt){
      search(prompt, languageManner, wordCount, keywords)
      .then(data => setResult(data))
    }
  }

  return (
    <div className="flex flex-col h-full relative">
      <nav className="flex flex-row justify-between items-center py-2 px-4 h-[5vh] w-full border-b border-[#e5e5e5]">
        <span>
          <h1 className="text-lg font-medium  text-gray-900">BlogPolisher</h1>
        </span>

        <div className="flex flex-row">
          <ul className="flex flex-row gap-4">
            <li><a className="text-2xl text-gray-700" href="https://x.com/kartikmistryy"><AiOutlineTwitter/></a></li>
            <li><a className="text-2xl text-gray-700" href="https://github.com/developedbykmistry"><AiOutlineGithub/></a></li>
            <li><a className="text-2xl text-gray-700" href="https://www.instagram.com/karrtikkk__/"><AiOutlineInstagram/></a></li>
            <li><a className="text-2xl text-gray-700" href="https://www.linkedin.com/in/kartikmistry19/"><FaLinkedin/></a></li>
          </ul>


          <span className={`${responsive == true ? "flex" : "hidden"}`} onClick={() => setShowMenu(!showMenu)}>
            <svg className="text-2xl" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        </span>
        </div>
      </nav>

      <div className="flex md:flex-row flex-col w-full h-full ">
        <nav className={`absolute z-30 right-0 top-[5vh] md:top-0 md:relative flex flex-col md:w-[20vw] w-full border-r-[1px] h-[94vh] transition-all backdrop-blur-sm bg-[#f3f3f3e6]
        ${showMenu ? "opacity-1 pointer-events-auto bg-[#f3f3f3e6]": "opacity-0 pointer-events-none"}`}>

          <div className="flex flex-col md:w-[16vw] w-[60vw] h-full z-10 absolute right-0 md:rela tive bg-white">
            <ul className="flex flex-col gap-2 border-b-[1px] p-2">
              <h3 className="text-sm font-[420] my-1 ml-2 text-gray-900">Select your tone</h3>
            {languages.map((language) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <li 
                onClick={(e) => changeLanguageManner(e.target.innerHTML)}
                className={`${ language == languageManner ? "flex item-center justify-start font-normal text-[14px] text-[#4b5563] px-3  py-1.5 bg-[#eeeeee] hover:bg-[#eee] rounded-md ml-2 cursor-pointer" : "flex item-center justify-start font-normal text-[14px] text-[#4b5563] px-3 py-1.5 hover:bg-[#eee] rounded-md ml-2 cursor-pointer"}`}
                >{language}</li>
              )
            })}
            </ul>

            <span className="flex flex-col gap-4 w-full border-b-[1px] p-4">
              <label className="text-sm" htmlFor=""><span className="text-sm font-[420] text-gray-900">Words</span>:
              <input type="number" value={wordCount} className="bg-transparent w-[50px] mx-2 text-gray-900"
              onChange={(e) => setWordCount(e.target.value)}/>
              </label>
              <input type="range" name="wordCount" 
              value={wordCount}
              onChange={(e) => setWordCount(e.target.value)} 
              min={100}
              max={1000}/>
            </span>

            <span className="flex flex-col p-4 gap-2">
              <label className="text-sm font-[420] text-gray-900">Keywords</label>
              <input value={keyword} ref={inputRef}  onChange={(e) => setKeyword(e.target.value)} type="text" placeholder="Enter word here..." className="py-1 px-2 text-sm bg-transparent border-[1px] rounded-md border-[#e5e5e5] outline-none text-gray-900"/>
              <div className="grid grid-cols-auto-fill gap-4 max-h-[350px] overflow-scroll">
                {keywords.map((word) => {
                  if(word.length > 0){
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <span onClick={(e) => removeKeyword(e)} className="bg-[#1579dd] text-white py-1 px-2 rounded-md flex items-center justify-center text-xs w-fit hover:bg-[hsl(210,100%,72%)]">{word}</span>
                    )
                  }
                })}
              </div>
            </span>
          </div>
        </nav>

        <section className="flex md:flex-row flex-col gap-5 md:ml-4 md:p-2 p-4  w-full">
          <div className="h-full md:w-[35vw] w-full">
            <h1 className="my-3 text-sm text-gray-900">👇 Your content here...</h1>
            <textarea 
            type="text" 
            placeholder="Enter text to be polished..."
            value={prompt}
            className="text-gray-900 font-normal md:w-[35vw] w-full md:h-[75vh] h-[50vh] rounded-xl p-3  border-[#d2cfcf] bg-[#f9f9f9] text-sm shadow-sm border-[1px] outline-none placeholder:text-gray-800 placeholder:font-normal"
            onChange={(e) => setPrompt(e.target.value)}
            />
            <button onClick={() => submit()} className="w-full h-[5vh] bg-gradient-to-r from-purple-500 to-pink-500 rounded-md text-white text-sm font-medium mt-2">Generate</button>
          </div>
        
          <div className="flex flex-col w-full">
            <span className="flex flex-row justify-between items-center">
              <h1 className="text-sm py-3 text-gray-900">⚡️ Optimised content here..</h1>
              <button onClick={() => copyText()} className="text-xs px-3 py-0.5 h-6 w-fit bg-[#1579dd] text-white rounded-md">Copy</button>
            </span>
            <textarea   
              type="text" 
              placeholder="🤖 Generated text will be displayed here..."
              value={result}
              className="text-gray-800 md:w-[45vw] w-full md:h-[82vh] h-[70vh] rounded-xl p-3 bg-transparent border-[#d2cfcf] bg-[#f9f9f9] shadow-sm text-sm border-[1px] outline-none  relative placeholder:text-gray-800 placeholder:font-normal"
              onChange={(e) => setResult(e.target.value)}
              />
          </div>

        </section>
      </div>
    </div>
  );
}
