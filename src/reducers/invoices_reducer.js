import { UPDATE_INVOICE, GET_INVOICES, CREATE_INVOICE, DELETE_INVOICE } from '../actions/types';


let subtotal = 0;
let tax = 0;
let total = 0;

let decimalFix = (tax) => {
  tax = Number(tax.toFixed(2)) + ''

  let taxLen = tax.length - 1
  let decimalLocation = tax.indexOf('.')

  if (decimalLocation === taxLen - 1) {
    tax += '0'
    return tax
  } else {
    return Number(tax)
  }
}


export default function(state = { allInvoices: [], subtotal, tax, total }, action = {}) {
  switch (action.type) {

    case GET_INVOICES:
      return {
        ...state,
        subtotal: Number(subtotal.toFixed(2)),
        tax: decimalFix(tax),
        total: decimalFix(total)
      };

    case CREATE_INVOICE:
      subtotal += action.payload.quantity * action.payload.price
      tax = subtotal * .05
      total = subtotal + tax

      console.log('subtotal', subtotal, total)
      return {
        ...state,
        allInvoices: [
        action.payload,
          ...state.allInvoices
        ],
        subtotal: Number(subtotal.toFixed(2)),
        tax: decimalFix(tax),
        total: decimalFix(total)
      }

    case DELETE_INVOICE:
      let prevSubtotal = action.payload.quantity * action.payload.price
      let prevTax = prevSubtotal * .05

      subtotal -= prevSubtotal
      tax -= prevTax
      total -= (prevTax + prevSubtotal)

      return {
        ...state,
        allInvoices: [
        ...state.allInvoices.filter(invoice => invoice.id !== action.payload.id)
        ],
        subtotal: Number(subtotal.toFixed(2)),
        tax: decimalFix(tax),
        total: decimalFix(total)
      }

    case UPDATE_INVOICE:

      let updatingInvoice;

        //first find the invoice to update
        for(var i = 0; i < state.allInvoices.length; i++){
          if (state.allInvoices[i].id === action.payload.id) {
            // re-label it
            updatingInvoice = state.allInvoices[i];

            let prevQuantity = updatingInvoice.quantity
            let prevPrice = updatingInvoice.price
            let prevTax = (prevQuantity * prevPrice) * .05
            let prevSubtotal = prevQuantity * prevPrice

            //subtract amounts from 'updating' invoice
            subtotal -= prevSubtotal
            tax -= prevTax
            total -= (prevTax + prevSubtotal)

            let currQuantity = action.payload.quantity
            let currPrice = action.payload.price
            let currTax = (currQuantity * currPrice) * .05
            let currSubtotal = currQuantity * currPrice

            //add amounts from 'updated' invoice
            subtotal += currQuantity * currPrice
            tax += currTax
            total += currTax + currSubtotal

            updatingInvoice.item = action.payload.item;
            updatingInvoice.quantity = action.payload.quantity;
            updatingInvoice.price = action.payload.price;
          }
        }

    return {
      ...state,
      subtotal: Number(subtotal.toFixed(2)),
      tax: decimalFix(tax),
      total: decimalFix(total)
    }
  }

  return state;
}