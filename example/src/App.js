import React, {useRef, useState} from 'react'
import Popover from "react-text-selection-popover";
import TextAnnotator from 'react-advance-text-annotator'
import 'react-advance-text-annotator/dist/index.css'
import _ from 'lodash'
import TypeList from "./TypeList";

const drug = [{
  type: "drug",
  term: "Trimethoprim"
}, {
  type: "drug",
  term: "solid-organ"
}, {
  type: "disease",
  term: "TMP-SMX OC"
}, {
  type: "disease",
  term: "sulphonamide therapeutic options"
}, {
  type: "other",
  term: "Pneumocystis jirovecii"
}]
const colorByType = {
  drug: 'red',
  disease: 'green',
  other: 'pink'
}

const App = () => {
  const refParagraph = useRef(null);
  const [data, setData] = useState(drug);
  const types = [...new Set(drug.map(data => data.type))];
  const PopoverBoxWithButtons = () => {
    console.log("data ==", data)
    const onClick = (type) => {
      const term = window.getSelection().toString();
      const newData = [
        ...data,
        {type , term}
      ];
      console.log("new daa ==>", newData)
      // setData(newData)
    };
    return (<div>
      {types.map((item, i) => {
        return (<button key={item + i} onClick={() => onClick(item)}>{item}</button>)
      })}
    </div>)
  };
  return <div>
    <div
      ref={refParagraph}
      className='content'
    >
    <TextAnnotator
    searchAccessor='term'
    searchWords={data}
    content="Background. Trimethoprim sulfamethoxazole (TMP-SMX) is the preferred agent for Pneumocystis jirovecii pneumonia prophylaxis Trimethoprim in immunocompromised hosts (ICH). However, TMP-SMX is frequently avoided due to an adverse drug reaction (ADR) history. We report on a novel multicentre programmatic approach to TMP-SMX ADRs in ICH. Methods. We reviewed ICH with a reported TMP-SMX ADR referred to the conjoint antibiotic allergy services at Austin Health (Melb, Aus) and Peter MacCallum Cancer Centre (Melb, Aus) between April 2015 and May 2018. ICH were defined as patients with a history of cancer, transplantation, autoimmune-condition or prednisolone use > 20 mg day for 1 month. Patients were assessed and managed as per the TMPSMX ADR protocol (Figure 1). Results. Eighteen patients were assessed, of which 16 (89%) underwent allergy testing (6;89% patch testing [PT] and/or 9;56% oral rechallenge [OC]) and 2 (11%) successful desensitization. Of those that underwent allergy testing, 10 (63%) were cancer patients, four (25%) solid-organ transplant recipients, one (6%) HIV and one (6%) multiple sclerosis. The median age was 59 (IQR 49.5, 65) and predominate phenotypes were severe cutaneous adverse drug reactions (4; 22%) and maculopapular exanthema (MPE) (11; 61%). Eighty-nine percent (8/9) of OC patients tolerated TMP-SMX challenge. One patient experienced a recurrence of a mild self-resolving localized rash following TMP-SMX OC. Of those seven patients that did not undergo OC, two (29%) were PT positive and five (72%) histories of severe or recent T-cellmediated allergy. Three of the seven patients who did not undergo OC received and tolerated dapsone. Conclusion. A novel TMP-SMX ADR protocol was able to identify ICH with severe allergy phenotypes and provide alternative antibiotic sulphonamide therapeutic options, whilst safely rechallenging the majority with low-risk TMP-SMX ADR histories. (Figure Preseted). Background. Trimethoprim sulfamethoxazole (TMP-SMX) is the preferred agent for Pneumocystis jirovecii pneumonia prophylaxis Trimethoprim in immunocompromised hosts (ICH). However, TMP-SMX is frequently avoided due to an adverse drug reaction (ADR) history. We report on a novel multicentre programmatic approach to TMP-SMX ADRs in ICH. Methods. We reviewed ICH with a reported TMP-SMX ADR referred to the conjoint antibiotic allergy services at Austin Health (Melb, Aus) and Peter MacCallum Cancer Centre (Melb, Aus) between April 2015 and May 2018. ICH were defined as patients with a history of cancer, transplantation, autoimmune-condition or prednisolone use > 20 mg day for 1 month. Patients were assessed and managed as per the TMPSMX ADR protocol (Figure 1). Results. Eighteen patients were assessed, of which 16 (89%) underwent allergy testing (6;89% patch testing [PT] and/or 9;56% oral rechallenge [OC]) and 2 (11%) successful desensitization. Of those that underwent allergy testing, 10 (63%) were cancer patients, four (25%) solid-organ transplant recipients, one (6%) HIV and one (6%) multiple sclerosis. The median age was 59 (IQR 49.5, 65) and predominate phenotypes were severe cutaneous adverse drug reactions (4; 22%) and maculopapular exanthema (MPE) (11; 61%). Eighty-nine percent (8/9) of OC patients tolerated TMP-SMX challenge. One patient experienced a recurrence of a mild self-resolving localized rash following TMP-SMX OC. Of those seven patients that did not undergo OC, two (29%) were PT positive and five (72%) histories of severe or recent T-cellmediated allergy. Three of the seven patients who did not undergo OC received and tolerated dapsone. Conclusion. A novel TMP-SMX ADR protocol was able to identify ICH with severe allergy phenotypes and provide alternative antibiotic sulphonamide therapeutic options, whilst safely rechallenging the majority with low-risk TMP-SMX ADR histories. (Figure Preseted)."
    marker={({text, data}) => (<mark id={text.replace(/[^a-zA-Z0-9]/g, '')} style={{backgroundColor: colorByType[data.type]}}>{text}</mark>)}
  />
    </div>
    <Popover selectionRef={refParagraph}>
      <PopoverBoxWithButtons />
    </Popover>
    <TypeList types={types} drug={drug} />
    {JSON.stringify(data)}
  </div>
}

export default App
