import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentResultsService } from '../investment-results/investment-results.service';
import { InvestmentResults } from '../investment-results/investment-results.model';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  constructor(private investmentService: InvestmentResultsService) {}

  private results: InvestmentResults[] = [];

  @Output() calculate = new EventEmitter<InvestmentResults[]>();

  initialInvestment = 0;
  annualInvestment = 0;
  expectedReturn = 0;
  duration = 0;

  get isFormInvalid(): boolean {
    return (
      !this.initialInvestment ||
      !this.annualInvestment ||
      !this.expectedReturn ||
      !this.duration
    );
  }

  onCalculateInvestment() {
    this.results = this.investmentService.calculateInvestmentResults({
      initialInvestment: this.initialInvestment,
      annualInvestment: this.annualInvestment,
      expectedReturn: this.expectedReturn,
      duration: this.duration,
    });
    this.calculate.emit(this.results);
  }
}
