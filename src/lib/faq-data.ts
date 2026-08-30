export type FaqItem = { q: string; a: string };
export type FaqCategory = { label: string; faqs: FaqItem[] };

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    label: "Selling",
    faqs: [
      {
        q: "How Long Does It Take to Sell My Home?",
        a: "The time it takes to sell your home varies, but on average, you can expect the process to take about two months. This includes 14–21 days on the market before receiving an offer and an additional 30 days for the buyer's financing to finalize.",
      },
      {
        q: "How Did My Friend's Home Sell in 2 Weeks?",
        a: "While it's possible for a home to sell quickly, it's not the norm. Quick sales often occur when buyers pay in cash or use specialty financing. For most transactions, the process takes longer, but proper pricing and preparation will still get you a successful sale.",
      },
      {
        q: "How Much Does It Cost to Sell My Home?",
        a: "Typically, you can expect to pay 8–10% of the sales price in closing costs, which includes agent commissions, state excise tax, and title & escrow fees. Some additional costs may arise from repairs, upgrades, or seller concessions.",
      },
      {
        q: "Who Is Involved in the Sale of My Home?",
        a: "Seller's Agent / Brokerage, Buyer's Agent / Brokerage, Escrow Office, Title Office, Lender, Appraiser, Inspector, and County Government.",
      },
      {
        q: "How Do I Get My Home Ready to Sell?",
        a: "To make your home appealing to buyers, remove personal items, clear clutter, and clean key areas like the kitchen and bathrooms. We'll guide you on the most impactful updates, such as neutral paint or landscaping, and advise on eliminating any odors that might deter buyers.",
      },
      {
        q: "What Are the Benefits of Selling and Buying Simultaneously?",
        a: "Selling your current home while searching for a new one can offer flexibility in timing, help you negotiate better purchase terms, and reduce the stress of a rushed home search. You may even be able to negotiate a “rent-back” agreement to stay in your home longer while completing your new home purchase.",
      },
      {
        q: "Should I Fix Up My Home or Sell As-Is?",
        a: "We offer personalized advice to help you decide whether to make repairs or sell your home in its current condition. Key improvements like fresh paint or updated flooring often yield the best return on investment, but we'll provide an estimate based on your home's specific needs.",
      },
      {
        q: "How Do I Know If My Home Is Priced Correctly?",
        a: "Your home's pricing should be based on market conditions, comparable sales, and current demand. Our team will provide you with a comprehensive market analysis to ensure you list at the optimal price.",
      },
      {
        q: "Do I Need to Be Out of My Home by Closing Day?",
        a: "Technically, you have until 9:00 PM on closing day to move out. However, if you can move out earlier, it's appreciated. In some cases, you may negotiate a rent-back agreement with the buyer.",
      },
      {
        q: "When Do I Get Paid From My Sale?",
        a: "After closing, you'll receive your proceeds within one business day via wire transfer, or the funds will be available for pickup at the escrow office or sent by overnight mail.",
      },
    ],
  },
  {
    label: "Buying",
    faqs: [
      {
        q: "What Are the Common Costs When Buying a Home?",
        a: "In addition to your down payment, buyers can expect costs such as earnest money, home inspections, appraisals, and closing costs, which typically amount to around 3% of the purchase price.",
      },
      {
        q: "What Is Earnest Money?",
        a: "Earnest money is a deposit made to the seller to show your commitment to buying the property. This money is held in escrow and applied to your down payment or closing costs upon closing.",
      },
      {
        q: "What Are Contingencies?",
        a: "Contingencies are conditions that must be met for a real estate transaction to proceed. They are in place to protect either the buyer or seller's interests throughout the transaction.",
      },
      {
        q: "What Is Escrow?",
        a: "Escrow is a neutral third party that holds funds and documents related to the sale, ensuring all conditions of the contract are met before the transaction is finalized.",
      },
      {
        q: "What Is Title Insurance?",
        a: "Title insurance protects you from potential property issues like liens or ownership disputes. It ensures your right to occupy, sell, or use the property without interference from past claims.",
      },
      {
        q: "What Happens During the Inspection Process?",
        a: "The inspection generally takes a few hours, and you're not required to be present. The buyer's agent will be there, and if any issues arise, the buyer may ask for repairs. You and the buyer will negotiate and agree on how to handle any repairs.",
      },
      {
        q: "What Is an Appraisal?",
        a: "An appraisal is an assessment conducted by a third-party appraiser to ensure the property's purchase price aligns with its market value for the lender's investment purposes.",
      },
      {
        q: "When Do I Sign the Paperwork to Transfer Ownership?",
        a: "Once your loan documents are sent to escrow, they will schedule a time for you to sign the closing documents, typically at the escrow office or with a mobile notary.",
      },
      {
        q: "What Are Closing Costs?",
        a: "Closing costs usually amount to 8–10% of the sale price, including agent commissions, taxes, title fees, and other associated costs. We'll provide a detailed breakdown based on your specific transaction.",
      },
      {
        q: "How Do I Get Started With Buying or Selling a Home?",
        a: "Getting started is easy! The first step is to schedule a consultation with our team. We'll take the time to understand your goals, preferences, and timeline — whether you're buying or selling, we'll walk you through every step. Contact us today to begin your real estate journey.",
      },
    ],
  },
];

export function allFaqItems(): FaqItem[] {
  return FAQ_CATEGORIES.flatMap((c) => c.faqs);
}
