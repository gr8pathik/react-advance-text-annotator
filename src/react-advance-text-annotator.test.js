import React from 'react'
import { render } from '@testing-library/react'
import TextAnnotator from './react-advance-text-annotator'

describe('TextAnnotator', () => {
  const sampleContent =
    'Background. Trimethoprim sulfamethoxazole (TMP-SMX) is the preferred agent for Pneumocystis jirovecii pneumonia prophylaxis in immunocompromised hosts (ICH). However, TMP-SMX is frequently avoided due to an adverse drug reaction (ADR) history. We report on a novel multicentre programmatic approach to TMP-SMX ADRs in ICH. Methods. We reviewed ICH with a reported TMP-SMX ADR referred to the conjoint antibiotic allergy services at Austin Health (Melb, Aus) and Peter MacCallum Cancer Centre (Melb, Aus) between April 2015 and May 2018. ICH were defined as patients with a history of cancer, transplantation, autoimmune-condition or prednisolone use > 20 mg day for 1 month. Patients were assessed and managed as per the TMPSMX ADR protocol (Figure 1). Results. Eighteen patients were assessed, of which 16 (89%) underwent allergy testing (6;89% patch testing [PT] and/or 9;56% oral rechallenge [OC]) and 2 (11%) successful desensitization. Of those that underwent allergy testing, 10 (63%) were cancer patients, four (25%) solid-organ transplant recipients, one (6%) HIV and one (6%) multiple sclerosis. The median age was 59 (IQR 49.5, 65) and predominate phenotypes were severe cutaneous adverse drug reactions (4; 22%) and maculopapular exanthema (MPE) (11; 61%). Eighty-nine percent (8/9) of OC patients tolerated TMP-SMX challenge. One patient experienced a recurrence of a mild self-resolving localized rash following TMP-SMX OC. Of those seven patients that did not undergo OC, two (29%) were PT positive and five (72%) histories of severe or recent T-cellmediated allergy. Three of the seven patients who did not undergo OC received and tolerated dapsone. Conclusion. A novel TMP-SMX ADR protocol was able to identify ICH with severe allergy phenotypes and provide alternative antibiotic sulphonamide therapeutic options, whilst safely rechallenging the majority with low-risk TMP-SMX ADR histories. (Figure Preseted).'
  /**
   * Below search words checks from
   * 1 Simple String
   * 2 String with special character and multiple words '10 (63%)', not working with round brackets
   * 3 String with dash (-)
   * 4 String with special character and multiple words
   * 5 multiple words
   */
  const searchWordsSimple = [
    'Trimethoprim',
    'solid-organ',
    'TMP-SMX OC',
    'sulphonamide therapeutic options'
  ]
  const searchWordsObject = [
    {
      type: 'drug',
      term: 'Trimethoprim'
    },
    {
      type: 'drug',
      term: 'solid-organ'
    },
    {
      type: 'disease',
      term: 'TMP-SMX OC'
    },
    {
      type: 'disease',
      term: 'sulphonamide therapeutic options'
    }
  ]
  it('Should return a normal text if the content and searchWords is empty', () => {
    const { container } = render(<TextAnnotator />)
    expect(container.innerHTML).toBe('')
  })
  it('Should return a normal text if the content', () => {
    const { container } = render(
      <TextAnnotator searchWords={['Trimethoprim']} />
    )
    expect(container.innerHTML).toBe('')
  })
  it('Should return a normal text if the content is present but searchWords are empty', () => {
    const { container } = render(
      <TextAnnotator content={sampleContent} />
    )
    expect(container.children.length).toBe(0)
    expect(container.textContent).toBe(sampleContent)
  })
  it('Should return a text with marker if the words are match in content', () => {
    const { container } = render(
      <TextAnnotator
        content={sampleContent}
        searchWords={searchWordsSimple}
      />
    )
    expect(container.children.length).toBe(4)
  })
  it('Should return a text with marker if the words are match in content', () => {
    const Marker = () => <div>Marked Text</div>
    const { container } = render(
      <TextAnnotator
        content={sampleContent}
        searchWords={searchWordsSimple}
        marker={Marker}
      />
    )
    expect(container.children.length).toBe(4)
    expect(container.children[1].textContent).toBe('Marked Text')
  })
  it('Should throw an error if the searchWord is an array of object and the searchAccessor is not defined', () => {
    const Marker = () => <div>Marked Text</div>
    try {
      render(
        <TextAnnotator
          content={sampleContent}
          searchWords={searchWordsObject}
          marker={Marker}
        />
      )
    } catch (message) {
      expect(message).toBe(
        'searchAccessor needed for searchWords as array of objects'
      )
    }
  })
  it('Should throw an error if the searchWord is an array of object and the searchAccessor is not defined', () => {
    const Marker = () => <div>Marked Text</div>
    try {
      render(
        <TextAnnotator
          content={sampleContent}
          searchWords={searchWordsObject}
          marker={Marker}
        />
      )
    } catch (message) {
      expect(message).toBe(
        'searchAccessor needed for searchWords as array of objects'
      )
    }
  })
  it('Should throw an error if the searchWord is an array of object and the searchAccessor is defined but not exist in search object', () => {
    const Marker = () => <div>Marked Text</div>
    expect(() => {
      render(
        <TextAnnotator
          content={sampleContent}
          searchWords={searchWordsObject}
          marker={Marker}
        />
      )
    }).toThrowError()
  })
  it.only('Should give an result if the searchWord is an array of object and the searchAccessor is defined', () => {
    const Marker = () => <div>Marked Text</div>;
    const { container } = render(
      <TextAnnotator
        content={sampleContent}
        searchWords={searchWordsObject}
        searchAccessor='term'
        marker={Marker}
      />
    )
    expect(container.children.length).toBe(4)
  })
})
