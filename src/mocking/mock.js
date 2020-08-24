export const getReset = () => 
({
    answers: {},
    batch: 0
})

export const getBatchOne = () =>  
({
    questions : {},
    newQuestions : [
      {
        key: 'isSelfAssessment',
        displayValue: 'Do you only require your income tax return to be submitted?',
        type: 'boolean'
      },
    ],
    quote : 200,
    batch : 1,
    moreQuestionsAvailable : true
})

export const getBatchTwo = () => 
({
    questions : {
        'isSelfAssessment': true
      },
      newQuestions : [
        {
          key: 'service',
          displayValue: 'What industry are you in?',
          type: 'selection',
        },
        {
          key: 'legalType',
          displayValue: 'What type of legal entity needs the accounts done?',
          type: 'selection',
        },
        {
          key: 'isVat',
          displayValue: 'Is the company VAT registered?',
          type: 'boolean',
        },
      ],
      quote : 500,
      batch : 2,
      moreQuestionsAvailable : true
})

export const getBatchThree = (questions) => {
    return ({
        questions : {
            'isSelfAssessment': true,
            'service':answer2,
            'legalType':answer3,
            'isVat':answer4,
          },
          newQuestions : [
            {
              key: questionKey5,
              displayValue: questionToDiplay5,
              type: questionType5,
            },
            {
              key: questionKey6,
              displayValue: questionToDiplay6,
              type: questionType6,
            },
          ],
          qoute : value3,
          batch : 3,
          moreQuestionsAvailable : false,
    })
}