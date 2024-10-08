import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Image as ImageIcon, Info, Video, Shirt } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Navbar from '@/components/home/Navbar'

const Home = () => {
  const [activeTab, setActiveTab] = useState<'photo' | 'video' | 'clothes'>('photo')
  const [sourceFile, setSourceFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const sourceInputRef = useRef<HTMLInputElement>(null)
  const [showProcessedMedia, setShowProcessedMedia] = useState(false)
  const [clothesDescription, setClothesDescription] = useState('')

  const handleSourceUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSourceFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
    //This should be removed in the final version
    console.log(sourceFile);
  }

  const triggerSourceUpload = () => {
    sourceInputRef.current?.click()
  }

  const processedMedia = [
    { id: 1, type: 'video', name: 'Video 1', createdAt: '2023-06-01', expiresAt: '2023-07-01' },
    { id: 2, type: 'image', name: 'Image 1', createdAt: '2023-06-02', expiresAt: '2023-07-02' },
    // ... add more items as needed
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
    <Navbar showProcessedMedia={showProcessedMedia} setShowProcessedMedia={setShowProcessedMedia}/>

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {showProcessedMedia ? (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Processed Media</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {processedMedia.map((item) => (
                    <Card key={item.id}>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-center h-40 bg-gray-200 rounded-md mb-2">
                        {item.type === 'video' ? ( <Video className="w-12 h-12 text-gray-400" /> ) : (<ImageIcon className="w-12 h-12 text-gray-400" /> )}
                        </div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-500">Created: {item.createdAt}</p>
                        <p className="text-sm text-gray-500">Expires: {item.expiresAt}</p>
                    </CardContent>
                    </Card>
                    ))}
                </div>
            </div>
        ) : (
            <>
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">AI Face Swap & Clothes Change</h1>
                <p className="text-center text-gray-600 mb-8">Upload your photos or videos to swap faces or change clothes. Be whoever you want to be!</p>

                <div className="flex flex-col sm:flex-row sm:justify-center space-y-2 sm:space-y-0 sm:space-x-2 mb-8">
                    <Button className={`${activeTab === 'photo' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:text-purple-600 hover:bg-[#F6F6F6]'}`} onClick={() => setActiveTab('photo')}>Photo Face Swap</Button>
                    <Button className={`${activeTab === 'video' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:text-purple-600 hover:bg-[#F6F6F6]'}`} onClick={() => setActiveTab('video')}>Video Face Swap</Button>
                    <Button className={`${activeTab === 'clothes' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:text-purple-600 hover:bg-[#F6F6F6]'}`} onClick={() => setActiveTab('clothes')}>Change Clothes</Button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                        {previewUrl ? (
                        <div className="mb-4"> {activeTab === 'video' ? (<video src={previewUrl} controls className="w-full rounded-lg shadow-lg" />) : (<img src={previewUrl} alt="Uploaded source" className="w-full rounded-lg shadow-lg" />)}</div>
                        ) : (
                        <div className="relative mb-4">
                            <img src="/placeholder.svg?height=400&width=600" alt="Face swap example" className="w-full rounded-lg shadow-lg" />
                            <div className="absolute bottom-4 left-4 bg-white rounded-full p-2 shadow-md">
                                <img src="/placeholder.svg?height=60&width=60" alt="Original face" className="w-15 h-15 rounded-full" />
                            </div>
                        </div>
                        )}
                        <p className="mt-4 text-sm text-gray-500 flex items-center"> <Info className="w-4 h-4 mr-1" /> Disclaimer: This AI service is for personal entertainment only. Please do not distribute or use the modified content for illegal purposes.</p>
                    </div>

                <div className="md:w-1/2">
                    <Card className="w-full">
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold"> 1</div>
                                        <h3 className="font-medium text-gray-700">{activeTab === 'clothes' ? 'Upload a full-body photo' : activeTab === 'photo' ? 'Upload a photo with a face (Source image)' : 'Upload a video with a face (Source video)'}</h3>
                                    </div>
                                    <input type="file" ref={sourceInputRef} className="hidden" onChange={handleSourceUpload} accept={activeTab === 'video' ? "video/*" : "image/*"}/>
                                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={triggerSourceUpload}>
                                        {activeTab === 'video' ? (
                                            <> <Video className="w-4 h-4 mr-2" /> Upload Source Video </>
                                        ) : (
                                            <> <ImageIcon className="w-4 h-4 mr-2" /> Upload Source Photo</>
                                        )}
                                    </Button>
                                    <p className="text-xs text-gray-500">
                                        {activeTab === 'video' ? 'Video: Max 100 MB (Upgrade to 500 MB). Drag or upload your GIF or video M4V, MP4, MOV, WEBM' : 'Drag or upload your photo JPG, PNG, WEBP'}
                                    </p>
                                </div>

                                {activeTab === 'clothes' ? (
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">2</div>
                                            <h3 className="font-medium text-gray-700">Describe the desired outfit</h3>
                                        </div>
                                        <div>
                                            <Label htmlFor="clothesDescription">Outfit Description</Label>
                                            <Textarea id="clothesDescription" placeholder="E.g., wearing a red dress, blue jeans with a white t-shirt, formal suit with a tie, etc." value={clothesDescription} onChange={(e) => setClothesDescription(e.target.value)} rows={4}/>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">2</div>
                                            <h3 className="font-medium text-gray-700">Upload a photo with a face (Target face image)</h3>
                                        </div>
                                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white"> <ImageIcon className="w-4 h-4 mr-2" />Upload Target Photo</Button>
                                        <p className="text-xs text-gray-500"> Drag or upload your photo JPG, PNG, WEBP</p>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">3</div>
                                        <h3 className="font-medium text-gray-700">{activeTab === 'clothes' ? 'Click Change Clothes Now to start' : 'Click Swap Face Now to start'}</h3>
                                    </div>
                                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                                        {activeTab === 'clothes' ? ( <> <Shirt className="w-4 h-4 mr-2" /> Change Clothes Now </> ) : ('Swap Face Now')}
                                    </Button>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">High quality</span>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded">{activeTab === 'photo' ? 'HD' : '1080P'}</span>
                                            <Switch />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    </div>
                </div>
            </>
        )}
    </main>
    </div>
  )
}

export default Home