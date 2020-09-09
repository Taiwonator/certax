const getReset = (answers) => ({
    questions: [],
    newQuestions: [],
    quote: 0, 
    batch: 0, 
    moreQuestionsAvailable: true
})

const getBatchOne = (answers) => ({
    questions : {},
    newQuestions : [
      {
        key: 'isSelfAssessment',
        displayValue: 'Do you only require your income tax return to be submitted?',
        info: 'This is the info section for income tax return',
        type: 'boolean'
      },
    ],
    quote : 200,
    batch : 1,
    moreQuestionsAvailable : true
})

const getBatchTwo = (answers) => {
  if(answers.isSelfAssessment == true) {
    console.log("Self assesment", answers.isSelfAssessment);
    return {
      questions: answers, 
      newQuestions: [], 
      quote: 240, 
      moreQuestionsAvailable: false
    };
  } else {
  return ({
    questions : answers,
      newQuestions : [
        {
          key: 'service',
          displayValue: 'What industry are you in?',
          info: 'This is the info section for services',
          type: 'selection',
          selections: {
            services: 'Services', 
            retail: 'Retail', 
            manufacturing: 'Manufacturing',
            propertyInvestor: 'Property Investor',
            other: 'Other'
          }
        },
        {
          key: 'legalType',
          displayValue: 'What type of legal entity needs the accounts done?',
          info: 'This is the info section for legal entity type',
          type: 'selection',
          selections: {
            limitedCompany: 'Limited Company',
            soleTrader: 'Sole Trader', 
            partnership: 'Partnership', 
          }
        },
        {
          key: 'isVat',
          displayValue: 'Is the company VAT registered?',
          info: 'This is the info section for if the company is VAT registered',
          type: 'boolean',
        },
      ],
      quote : 500,
      batch : 2,
      moreQuestionsAvailable: true
})}}

const getBatchThree = (answers) => {
  
    let newQuestions = [
        {
          key: 'requireBookeeping',
          displayValue: 'Do you require book keeping?',
          info: 'This is the info section for requiring bookkeeping',
          type: 'boolean',
        },
        {
          key: 'employees',
          displayValue: 'How many employees need payroll?',
          info: 'This is the info section for the number of employees on payroll',
          type: 'number',
        },
    ]

    const properties_question = {
        key: 'properties',
        displayValue: 'How many properties do you have?',
        info: 'This is the info section for the number of properties you have as a property investor',
        type: 'number'
    }

    if(answers.service == 'propertyInvestor') {
        newQuestions.push(properties_question);
    }
    console.log(answers.service);

    const directors_question = {
        key: 'directors',
        displayValue: 'How many directors are in the company',
        info: 'This is the info section for the number of directors in your company',
        type: 'number'
    }

    if(answers.legalType == 'limitedCompany') {
        newQuestions.push(directors_question);
    }

    const partnership_question = {
        key: 'partners', 
        displayValue: 'How many partners are in the company?', 
        info: 'This is the info section the number of partners in your company',
        type: 'number'
    }

    if(answers.legalType == 'partnership') {
        newQuestions.push(partnership_question);
    }


    return ({
        questions : answers,
        newQuestions,
        quote : 1200,
        batch : 3,
        moreQuestionsAvailable: true
    })
}

const getBatchFour = (answers) => {
    let newQuestions = [];
    const income_question = {
        key: 'income', 
        displayValue: 'What is your estimated annual turnover?', 
        info: 'This is the info section for your estimated annual turnover',
        type: 'number'
    }

    let moreQuestionsAvailable = true;
    if(answers.requireBookeeping) {
        newQuestions.push(income_question);
    } else {
      moreQuestionsAvailable = false;
    }

    return ({
        questions : answers,
        newQuestions,
        quote : 1600,
        batch : 4,
        moreQuestionsAvailable,
    })
}

const getBatchFive = (answers) => {
  return ({
    questions : answers,
    newQuestions: [],
    quote : 3000,
    batch : 5,
    moreQuestionsAvailable: false,
})
}

export const getBatch = (answers, batch) => {
  if(batch >= 0 && batch <= 5) {
    if (batch == 0) {
        return getReset(answers);
    } else if (batch == 1) {
        return getBatchOne(answers);
    } else if (batch == 2) {
        return getBatchTwo(answers);
    } else if (batch == 3) {
        return getBatchThree(answers);
    } else if (batch == 4) {
        return getBatchFour(answers);
    } else if (batch == 5) {
        return getBatchFive(answers);
    } else {
      console.log(`Unique ERROR | Batch: ${batch}`);
      return null;
    }  
  } else {
      console.log(`Batch ${batch} does not exist`);
      return null;
  }
}

export const getABatchMock = async (answers, batch) => {
  let obj = getBatch(answers, batch);
  await new Promise(resolve => setTimeout(resolve, 500));
  return obj;
}