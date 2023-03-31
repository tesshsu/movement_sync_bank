const validateData = (movements, balances) => {
    // Vérification des doublons dans les opérations
    const duplicates = movements.filter((movement, index) => {
        const firstIndex = movements.findIndex(
            (m) => m.label === movement.label && m.amount === movement.amount && m.date === movement.date && m.id !== movement.id
        );
        return firstIndex !== -1 && firstIndex < index;
    });

    if (duplicates.length > 0) {
        return { success: false, message: 'Les opérations contiennent des doublons.' };
    }

    // Vérification de la synchronisation
    const unbalancedDates = balances.filter((balance) => {
        const foundMovement = movements.find((movement) => movement.date === balance.date);
        if (!foundMovement) {
            return true;
        }
        console.log('foundMovement', foundMovement);
        const movementsBeforeDate = movements.filter((movement) => movement.date < balance.date);
        console.log('movementsBeforeDate', movementsBeforeDate);
        const totalAmountBeforeDate = movementsBeforeDate.reduce((total, movement) => total + movement.amount, 0);
        console.log('totalAmountBeforeDate', totalAmountBeforeDate);
        return totalAmountBeforeDate + foundMovement.amount !== balance.balance;
    });

    console.log('unbalancedDates', unbalancedDates);
    if (unbalancedDates.length > 0) {
        const messages = unbalancedDates.map((balance) => `Le solde du ${balance.date} ne correspond pas.`);
        return { success: false, message: messages };
    }

    return { success: true };
};

module.exports = { validateData };
