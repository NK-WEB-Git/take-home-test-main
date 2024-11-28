export const ENUM_SPECIAL_DRUGS = {
  HERBAL_TEA: "Herbal Tea",
  MAGIC_PILL: "Magic Pill",
  FERVEX: "Fervex",
  DAFALGAN: "Dafalgan",
};

export class Drug {
  constructor(name, expiresIn, benefit, factorDecrease = 1) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
    this.factorDecrease = factorDecrease;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  benefitInterval = (benefit) => {
    return Math.min(50, Math.max(0, benefit));
  };

  updateBenefitHerbalTea = (drug) => {
    drug.benefit = this.benefitInterval(
      drug.benefit + (drug.expiresIn < 0 ? 2 : 1),
    );
    drug.expiresIn -= 1;
    return drug;
  };

  updateBenefitMagicPill = (drug) => {
    // Magic Pill never expires nor decreases in benefit
    return drug;
  };

  updateBenefitFervex = (drug) => {
    if (drug.expiresIn < 0) {
      drug.benefit = 0;
    } else {
      let increase = 1;
      if (drug.expiresIn < 5) {
        increase = 3;
      } else if (drug.expiresIn < 10) {
        increase = 2;
      }
      drug.benefit = this.benefitInterval(drug.benefit + increase);
    }
    drug.expiresIn -= 1;
    return drug;
  };

  updateBenefitDafalgan = (drug) => {
    const decrease =
      drug.expiresIn < 0 ? 2 * drug.factorDecrease : 1 * drug.factorDecrease;
    drug.benefit = this.benefitInterval(drug.benefit - decrease);
    drug.expiresIn -= 1;
    return drug;
  };

  updateBenefitNotmalDrug = (drug) => {
    const decrease = drug.expiresIn < 0 ? 2 : 1;
    drug.benefit = this.benefitInterval(drug.benefit - decrease);
    drug.expiresIn -= 1;
    return drug;
  };

  updateBenefitValue() {
    this.drugs = this.drugs.map((drug) => {
      switch (drug.name) {
        case ENUM_SPECIAL_DRUGS.HERBAL_TEA:
          return this.updateBenefitHerbalTea(drug);
        case ENUM_SPECIAL_DRUGS.MAGIC_PILL:
          return this.updateBenefitMagicPill(drug);
        case ENUM_SPECIAL_DRUGS.FERVEX:
          return this.updateBenefitFervex(drug);
        case ENUM_SPECIAL_DRUGS.DAFALGAN:
          return this.updateBenefitDafalgan(drug);
        default:
          return this.updateBenefitNotmalDrug(drug);
      }
    });

    return this.drugs;
  }
}
