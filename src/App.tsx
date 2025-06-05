"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Copy, RotateCcw, Languages, ArrowLeftRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Language = {
  code: string
  name: string
}

const languages: Language[] = [
  { code: "en", name: "English" },
  { code: "ca-valencia", name: "Valencian" },
  // Add more languages here as needed
  // { code: "es", name: "Spanish" },
  // { code: "fr", name: "French" },
]

export default function TranslationPage() {
  const [sourceText, setSourceText] = useState("")
  const [targetText, setTargetText] = useState("")
  const [sourceLanguage, setSourceLanguage] = useState("en")
  const [targetLanguage, setTargetLanguage] = useState("ca-valencia")
  const [isTranslating, setIsTranslating] = useState(false)
  const { toast } = useToast()

  const getLanguageName = (code: string) => {
    return languages.find((lang) => lang.code === code)?.name || code
  }

  // Placeholder translation function - replace with your actual translation logic
  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast({
        title: "No text to translate",
        description: "Please enter some text to translate.",
        variant: "destructive",
      })
      return
    }

    if (sourceLanguage === targetLanguage) {
      toast({
        title: "Same language selected",
        description: "Please select different source and target languages.",
        variant: "destructive",
      })
      return
    }

    setIsTranslating(true)

    // Simulate API call - replace this with your actual translation service
    setTimeout(() => {
      // Placeholder translation - replace with your actual logic
      const direction = `${getLanguageName(sourceLanguage)} to ${getLanguageName(targetLanguage)}`
      setTargetText(`[Translated from ${direction}]: ${sourceText}`)
      setIsTranslating(false)
      toast({
        title: "Translation complete",
        description: `Text translated from ${direction}.`,
      })
    }, 1000)
  }

  const handleSwapLanguages = () => {
    // Swap languages
    const tempLang = sourceLanguage
    setSourceLanguage(targetLanguage)
    setTargetLanguage(tempLang)

    // Swap text content
    const tempText = sourceText
    setSourceText(targetText)
    setTargetText(tempText)
  }

  const handleCopy = async () => {
    if (!targetText) return

    try {
      await navigator.clipboard.writeText(targetText)
      toast({
        title: "Copied to clipboard",
        description: "Translation copied successfully.",
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy text to clipboard.",
        variant: "destructive",
      })
    }
  }

  const handleClear = () => {
    setSourceText("")
    setTargetText("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Languages className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Valencian Translator</h1>
          </div>
          <p className="text-lg text-gray-600">Translate between Valencian and other languages</p>
        </div>

        {/* Language Selection */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Label htmlFor="source-lang">From:</Label>
            <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="sm" onClick={handleSwapLanguages} className="gap-2" title="Swap languages">
            <ArrowLeftRight className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Label htmlFor="target-lang">To:</Label>
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Translation Interface */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Source Input */}
          <Card>
            <CardHeader>
              <CardTitle>{getLanguageName(sourceLanguage)}</CardTitle>
              <CardDescription>Enter the text you want to translate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="source-input">Source text</Label>
                <Textarea
                  id="source-input"
                  placeholder={`Type your ${getLanguageName(sourceLanguage)} text here...`}
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
              </div>
              <div className="text-sm text-gray-500">{sourceText.length} characters</div>
            </CardContent>
          </Card>

          {/* Target Output */}
          <Card>
            <CardHeader>
              <CardTitle>{getLanguageName(targetLanguage)}</CardTitle>
              <CardDescription>Translation will appear here</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="target-output">Translated text</Label>
                <Textarea
                  id="target-output"
                  placeholder="Translation will appear here..."
                  value={targetText}
                  readOnly
                  className="min-h-[200px] resize-none bg-gray-50"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">{targetText.length} characters</div>
                {targetText && (
                  <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            onClick={handleTranslate}
            disabled={isTranslating || !sourceText.trim() || sourceLanguage === targetLanguage}
            className="gap-2 px-8 py-3 text-lg"
            size="lg"
          >
            {isTranslating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Translating...
              </>
            ) : (
              <>
                Translate
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </Button>

          <Button variant="outline" onClick={handleClear} className="gap-2 px-6 py-3" size="lg">
            <RotateCcw className="h-4 w-4" />
            Clear All
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pb-8">
          <p className="text-sm text-gray-500">Valencian Translator • Ready for your translation service integration</p>
        </div>
      </div>
    </div>
  )
}
