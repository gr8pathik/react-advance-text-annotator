import React from 'react'
import PropTypes from 'prop-types'
import { findAll } from 'highlight-words-core'

const DefaultMarker = ({ text }) => {
  return <mark>{text}</mark>
}

const TextAnnotator = ({
  content = '',
  searchWords = [],
  searchAccessor = '',
  marker = DefaultMarker
}) => {
  let filteredSearchWords = JSON.parse(JSON.stringify(searchWords))
  let isSearchWordsObject = false
  if (
    searchWords.length > 0 &&
    typeof searchWords[0] === 'object' &&
    searchWords[0] !== null
  ) {
    // eslint-disable-next-line no-throw-literal
    if (!searchWords[0][searchAccessor])
      // eslint-disable-next-line no-throw-literal
      throw 'searchAccessor needed for searchWords as array of objects'
    isSearchWordsObject = true
    filteredSearchWords = searchWords.map(
      (wordsObj) => wordsObj[searchAccessor]
    )
  }
  const Marker = marker
  const chunks = findAll({
    searchWords: filteredSearchWords,
    textToHighlight: content
  })
  const highlightWords = chunks.map((chunk, i) => {
    const { end, highlight, start } = chunk
    const text = content.substr(start, end - start)
    if (highlight) {
      let textData = text
      if (isSearchWordsObject)
        textData = searchWords.filter(
          (wordsObj) => text === wordsObj[searchAccessor]
        )
      return <Marker text={text} key={text + i} data={textData[0]} />
    } else {
      return text
    }
  })
  return highlightWords
}

TextAnnotator.propType = {
  content: PropTypes.string,
  searchWords: PropTypes.array,
  searchAccessor: PropTypes.string,
  marker: PropTypes.element
}
export default TextAnnotator
