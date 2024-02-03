/* let input = "wir wissen nicht, warum (es $ das) so ist"

function permutations(input) {
    let outputArray = []

    let insertionPoints = input.search(/\(/)
    let inputWithoutBrackets = input.replace(/\(.+\)/, "")
    let shuffleBox = input.match(/\(.+\)/)[0].slice(1, -1).split(" $ ")

    for (let i = 0; i < shuffleBox.length; i++) {
        let permutation =
            inputWithoutBrackets.slice(0, insertionPoint)
            + shuffleBox[i]
            + inputWithoutBrackets.slice(insertionPoint)
            + " $ "

        outputArray.push

    }
}  */