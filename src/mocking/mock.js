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
  
    let newQuestions = [
        {
          key: 'requireBookeeping',
          displayValue: 'Do you require book keeping?',
          type: 'boolean',
        },
        {
          key: 'employees',
          displayValue: 'How many employees need payroll?',
          type: 'number',
        },
    ]

    const properties_question = {
        key: 'properties',
        displayValue: 'How many properties do you have?',
        type: 'number'
    }

    if(questions.service == 'property investor') {
        newQuestions.push(properties_question);
    }

    const directors_question = {
        key: 'directors',
        displayValue: 'How many directors are in the company',
        type: 'number'
    }

    if(questions.legalType == 'limited company') {
        newQuestions.push(directors_question);
    }

    const partnership_question = {
        key: 'partners', 
        displayValue: 'How many partners are in the company?', 
        type: 'number'
    }

    if(questions.legalType == 'partnership') {
        newQuestions.push(partnership_question);
    }


    return ({
        questions : {
            'isSelfAssessment': true,
            'service':'Services',
            'legalType':'Limited Company',
            'isVat':true,
          },
          newQuestions,
          quote : 1200,
          batch : 3,
          moreQuestionsAvailable : true,
    })
}

export const getBatchFour = (questions) => {
    let newQuestions = [];
    const income_question = {
        key: 'income', 
        displayValue: 'What is your estimated annual turnover?', 
        type: 'number'
    }

    if(questions.requireBookeeping) {
        newQuestions.push(income_question);
    }

    return ({
        questions : {
            'isSelfAssessment': true,
            'service':'Services',
            'legalType':'Limited Company',
            'isVat':true,
            'requireBookeeping': true, 
            ///
          },
          newQuestions,
          quote : 1600,
          batch : 4,
          moreQuestionsAvailable : false,
    })
}