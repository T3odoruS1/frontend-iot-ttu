export function formatCurrency(amount: number): string {
    if (amount > 1000000) {
        return `${Math.round(amount / 1000000)}M €`;
    } else if (amount > 1000) {
        return `${Math.round(amount / 1000)}K €`;
    } else {
        return `${amount} €`;
    }
}