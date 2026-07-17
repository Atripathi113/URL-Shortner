import React, { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api'
import { useSelector } from 'react-redux'
import { queryClient } from '../main'

const UrlForm = () => {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState()
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)
  const [customSlug, setCustomSlug] = useState("")
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await createShortUrl(url, customSlug)
      setShortUrl(result)
      queryClient.invalidateQueries({ queryKey: ['userUrls'] })
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-slate-100 mb-4">Shorten a URL</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-slate-400 mb-1.5">
            Enter your URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onInput={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very-long-link"
            required
            className="w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>

        {isAuthenticated && (
          <div>
            <label htmlFor="customSlug" className="block text-sm font-medium text-slate-400 mb-1.5">
              Custom slug <span className="text-slate-600">(optional)</span>
            </label>
            <input
              type="text"
              id="customSlug"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value)}
              placeholder="my-custom-link"
              className="w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 px-4 rounded-md transition-colors"
        >
          Shorten URL
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-950/50 border border-red-900 text-red-400 text-sm rounded-md">
          {error}
        </div>
      )}

      {shortUrl && (
        <div className="mt-5 pt-5 border-t border-slate-800">
          <p className="text-sm text-slate-400 mb-2">Your shortened URL</p>
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 bg-slate-800 border border-slate-700 text-indigo-300 rounded-l-md py-2 px-3 focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-r-md font-medium transition-colors ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-100'
              }`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UrlForm