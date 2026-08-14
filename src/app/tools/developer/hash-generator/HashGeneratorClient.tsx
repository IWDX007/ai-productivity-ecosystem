"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function HashGeneratorPage() {
  const [input, setInput] = useState("")
  const [hashes, setHashes] = useState<{ [key: string]: string }>({})
  const [copied, setCopied] = useState<string | null>(null)

  const md5 = (str: string): string => {
    function safeAdd(x: number, y: number) { const lsw = (x & 0xffff) + (y & 0xffff); return (((x >> 16) + (y >> 16) + (lsw >> 16)) << 16) | (lsw & 0xffff) }
    function rot(n: number, c: number) { return (n << c) | (n >>> (32 - c)) }
    function cmn(q: number, a: number, b: number, x: number, s: number, t: number) { return safeAdd(rot(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b) }
    function ff(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return cmn((b&c)|((~b)&d),a,b,x,s,t)}
    function gg(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return cmn((b&d)|(c&(~d)),a,b,x,s,t)}
    function hh(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return cmn(b^c^d,a,b,x,s,t)}
    function ii(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return cmn(c^(b|(~d)),a,b,x,s,t)}
    const K = new Array(64)
    for(let i=0;i<64;i++) K[i]=Math.floor(Math.abs(Math.sin(i+1))*Math.pow(2,32))
    const bytes = []
    for(let i=0;i<str.length;i++) bytes.push(str.charCodeAt(i))
    const l = bytes.length * 8
    const N = (Math.floor(l/32)+2)*16
    const X = new Array(N).fill(0)
    for(let i=0;i<l;i++) X[i>>5] |= (bytes[i>>3]&0xff)<<(i%32)
    X[l>>5] |= 0x80<<(l%32)
    X[N-2] = l
    let a=1732584193,b=-271733879,c=-1732584194,d=271733878
    for(let i=0;i<N;i+=16){
      const olda=a,oldb=b,oldc=c,oldd=d
      a=ff(a,b,c,d,X[i],7,K[0]);d=ff(d,a,b,c,X[i+1],12,K[1]);c=ff(c,d,a,b,X[i+2],17,K[2]);b=ff(b,c,d,a,X[i+3],22,K[3])
      a=ff(a,b,c,d,X[i+4],7,K[4]);d=ff(d,a,b,c,X[i+5],12,K[5]);c=ff(c,d,a,b,X[i+6],17,K[6]);b=ff(b,c,d,a,X[i+7],22,K[7])
      a=ff(a,b,c,d,X[i+8],7,K[8]);d=ff(d,a,b,c,X[i+9],12,K[9]);c=ff(c,d,a,b,X[i+10],17,K[10]);b=ff(b,c,d,a,X[i+11],22,K[11])
      a=ff(a,b,c,d,X[i+12],7,K[12]);d=ff(d,a,b,c,X[i+13],12,K[13]);c=ff(c,d,a,b,X[i+14],17,K[14]);b=ff(b,c,d,a,X[i+15],22,K[15])
      a=gg(a,b,c,d,X[i+1],5,K[16]);d=gg(d,a,b,c,X[i+6],9,K[17]);c=gg(c,d,a,b,X[i+11],14,K[18]);b=gg(b,c,d,a,X[i],20,K[19])
      a=gg(a,b,c,d,X[i+5],5,K[20]);d=gg(d,a,b,c,X[i+10],9,K[21]);c=gg(c,d,a,b,X[i+15],14,K[22]);b=gg(b,c,d,a,X[i+4],20,K[23])
      a=gg(a,b,c,d,X[i+9],5,K[24]);d=gg(d,a,b,c,X[i+14],9,K[25]);c=gg(c,d,a,b,X[i+3],14,K[26]);b=gg(b,c,d,a,X[i+8],20,K[27])
      a=gg(a,b,c,d,X[i+13],5,K[28]);d=gg(d,a,b,c,X[i+2],9,K[29]);c=gg(c,d,a,b,X[i+7],14,K[30]);b=gg(b,c,d,a,X[i+12],20,K[31])
      a=hh(a,b,c,d,X[i+5],4,K[32]);d=hh(d,a,b,c,X[i+8],11,K[33]);c=hh(c,d,a,b,X[i+11],16,K[34]);b=hh(b,c,d,a,X[i+14],23,K[35])
      a=hh(a,b,c,d,X[i+1],4,K[36]);d=hh(d,a,b,c,X[i+4],11,K[37]);c=hh(c,d,a,b,X[i+7],16,K[38]);b=hh(b,c,d,a,X[i+10],23,K[39])
      a=hh(a,b,c,d,X[i+13],4,K[40]);d=hh(d,a,b,c,X[i],11,K[41]);c=hh(c,d,a,b,X[i+3],16,K[42]);b=hh(b,c,d,a,X[i+6],23,K[43])
      a=hh(a,b,c,d,X[i+9],4,K[44]);d=hh(d,a,b,c,X[i+12],11,K[45]);c=hh(c,d,a,b,X[i+15],16,K[46]);b=hh(b,c,d,a,X[i+2],23,K[47])
      a=ii(a,b,c,d,X[i],6,K[48]);d=ii(d,a,b,c,X[i+7],10,K[49]);c=ii(c,d,a,b,X[i+14],15,K[50]);b=ii(b,c,d,a,X[i+5],21,K[51])
      a=ii(a,b,c,d,X[i+12],6,K[52]);d=ii(d,a,b,c,X[i+3],10,K[53]);c=ii(c,d,a,b,X[i+10],15,K[54]);b=ii(b,c,d,a,X[i+1],21,K[55])
      a=ii(a,b,c,d,X[i+8],6,K[56]);d=ii(d,a,b,c,X[i+15],10,K[57]);c=ii(c,d,a,b,X[i+6],15,K[58]);b=ii(b,c,d,a,X[i+13],21,K[59])
      a=ii(a,b,c,d,X[i+4],6,K[60]);d=ii(d,a,b,c,X[i+11],10,K[61]);c=ii(c,d,a,b,X[i+2],15,K[62]);b=ii(b,c,d,a,X[i+9],21,K[63])
      a=safeAdd(a,olda);b=safeAdd(b,oldb);c=safeAdd(c,oldc);d=safeAdd(d,oldd)
    }
    const arr = [a,b,c,d]
    let out = ""
    for(let i=0;i<arr.length*4;i++){
      out += "0123456789abcdef".charAt((arr[i>>2]>>((i%4)*8+4))&0x0f)
      out += "0123456789abcdef".charAt((arr[i>>2]>>((i%4)*8))&0x0f)
    }
    return out
  }

  const generate = async () => {
    if (!input) return
    const encoder = new TextEncoder()
    const data = encoder.encode(input)
    const buf = (algo: string) => crypto.subtle.digest(algo, data).then(h =>
      Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2, "0")).join(""))
    const [sha1, sha256, sha384, sha512] = await Promise.all([
      buf("SHA-1"), buf("SHA-256"), buf("SHA-384"), buf("SHA-512")
    ])
    setHashes({ MD5: md5(input), "SHA-1": sha1, "SHA-256": sha256, "SHA-384": sha384, "SHA-512": sha512 })
  }

  const copy = async (val: string, label: string) => {
    await navigator.clipboard.writeText(val)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Hash Generator" description="Generate MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes instantly." keywords="hash generator, free online tool, hash-generator, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "Hash Generator" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            Hash <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary text-lg">Generate MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes instantly.</p>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <label className="text-theme-primary font-medium block mb-2">Input Text</label>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            placeholder="Enter text to hash..." rows={5}
            className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none focus:border-crimson-500 mb-4" />
          <button onClick={generate} className="btn-primary px-8 py-2.5 rounded-xl font-medium">
            Generate All Hashes
          </button>
        </div>

        {Object.keys(hashes).length > 0 && (
          <div className="space-y-3">
            {Object.entries(hashes).map(([algo, hash]) => (
              <div key={algo} className="glass-card rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-crimson-500 font-semibold text-sm">{algo}</span>
                  <span className="text-theme-muted text-xs">{hash.length} chars</span>
                  <button onClick={() => copy(hash, algo)}
                    className="text-theme-muted hover:text-crimson-500">
                    {copied === algo ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                </div>
                <div className="bg-theme-secondary rounded-lg p-3 font-mono text-xs text-theme-primary break-all">
                  {hash}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
</div>
  )
}