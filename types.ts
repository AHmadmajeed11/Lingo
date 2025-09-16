
export interface ExampleSentence {
  turkish: string;
  arabic: string;
}

export interface TranslationResult {
  arabicTranslation: string;
  usageCases: string[];
  exampleSentences: ExampleSentence[];
}
