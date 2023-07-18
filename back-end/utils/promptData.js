

export const getGPTInstructions = (context) => {
    const instructions = `You have to create a book for kids based on the context${context}` + "You have to write some paragraphs in a way that is related to some scenario or picture. Each paragraph should not more than 300 words Give me your response the following json format. Your response must be in one line of string and in the follow the format like: {titile: 'a title for the book',summary: 'a summary of the book',paragraphs: [{paragraphTitle:'paragraph title',paragraph:'the paragrpah description'}]}"
    return instructions;
}
