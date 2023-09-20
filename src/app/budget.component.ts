import { Component, OnInit } from '@angular/core';
import { BudgetService } from './budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  transaction: Transaction = {
    montant: 0,
    categorie: "dépense"
  };

  solde: number = 0;

  constructor(private budgetService: BudgetService) {}

  ngOnInit() {
    this.transactions = this.budgetService.getTransactions();
    this.calculSolde();
  }

  addTransaction() {
    // Vérifier que les champs sont valides
    if (this.transaction.montant <= 0) {
      alert("Le montant doit être supérieur à 0.");
      return;
    }

    // Enregistrer la transaction
    this.budgetService.addTransaction(this.transaction);

    // Réinitialiser le formulaire
    this.transaction = {
      montant: 0,
      categorie: "dépense"
    };

    // Recalculer le solde
    this.calculSolde();
  }

  calculSolde() {
    for (const transaction of this.transactions) {
      if (transaction.categorie === "entrée") {
        this.solde += transaction.montant;
      } else if (transaction.categorie === "dépense") {
        this.solde -= transaction.montant;
      }
    }

    // Afficher le solde avec une devise
    this.solde = this.solde.toLocaleString("fr-FR", {
      style: "currency",
      currency: "EUR"
    });
  }

}

interface Transaction {
  montant: number;
  categorie: string;
}