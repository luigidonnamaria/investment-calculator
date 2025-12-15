import { Injectable } from '@angular/core';
import {
  InvestmentResults,
  InvestmentResultsData,
} from './investment-results.model';

@Injectable({ providedIn: 'root' })
export class InvestmentResultsService {
  private results: InvestmentResults[] = [];

  calculateInvestmentResults(data: InvestmentResultsData) {
    this.results = [];
    let investmentValue = data.initialInvestment;
    for (let i = 0; i < data.duration; i++) {
      const year = i + 1;
      const interestEarnedInYear =
        investmentValue * (data.expectedReturn / 100);
      investmentValue += interestEarnedInYear + data.annualInvestment;
      const totalInterest =
        investmentValue - data.annualInvestment * year - data.initialInvestment;
      this.results.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: data.annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested:
          data.initialInvestment + data.annualInvestment * year,
      });
    }

    return this.results;
  }
}
