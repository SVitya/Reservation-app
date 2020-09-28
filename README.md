# Reservation CMS [DEMO](https://svitya.github.io/Reservation-app/)

Create reservation website with only adding a firestore db

## Setting up

1. Create Firebase account
2. Create Firestore collection 'rentProviders'
3. Create document rentProvider1 with your data:
```
    title: <string>
    subtitle: <string>
    open: <number> - hour of opening
    close: <number> - hour of closing
    items: [ - array of items for reservations
        {
            id: <string>
            name: <string>
            quantity: <number>, - max available quantity of item
            price: { - object with keys for types of price, for example 'all day': '20$'
                'type': <string>
            }
        }
    ]
```
4. Add info for connecting to Firebase in 'projectFolder/src/api/firestore.js/firebaseConfig
