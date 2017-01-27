var data = {
    'header': {
        'title': 'Pay what you want for the',
        'bundleName': 'Divinity Bundle',
        'regularPrice': '($32 value!)',
        'bundlePerks': [
            {
                'icon': 'heart',
                'text': 'Support Larian Studios'
            },
            {
                'icon': 'mouse',
                'text': 'Play Divinity 2: DC before release'
            },
            {
                'icon': 'lock',
                'text': 'Get DRM-free games with goodies'
            }
        ]
    },
    'games': [
        {
            'link': 'Divine Divinity',
            'normalPrice': '(normal price $5.99)',
            'goodies': 'with 6 goodies and 4 language versions'
        },
        {
            'link': 'Beyond Divinity',
            'normalPrice': '(normal price $5.99)',
            'goodies': 'with 6 goodies and 4 language versions'
        },
        {
            'link': 'Divinity 2',
            'normalPrice': '(normal price $19.99)',
            'goodies': 'with 9 goodies and 7 language versions'
        }
    ],
    'footer': {
        'goodies': {
            'title': 'Goodies available for free with Divinity Bundle',
            'items': [
                {
                    'icon': 'note',
                    'title': '4 soundtracks',
                    'subTitle': 'Over 3 hours of award winning music from all 3 games.'
                },
                {
                    'icon': 'book',
                    'title': '2 short stories',
                    'subTitle': 'Prequel story for Divine Divinity and Beyond Divinity novella.'
                },
                {
                    'icon': 'journal',
                    'title': 'Divinity 2 - Dev Journal',
                    'subTitle': '144 pages long book, detailing story and art of Divinity 2.'
                },
                {
                    'icon': 'movie',
                    'title': 'Making of Divinity 2',
                    'subTitle': '40 minutes long, professional documentary about the development of Divinity 2.'
                },
                {
                    'icon': 'screen',
                    'title': '7 wallpapers',
                    'subTitle': 'Beautiful, hand crafted HD wallpapers with Divine, Beyond and Divinity 2 art.'
                },
                {
                    'icon': 'zip',
                    'title': '...and more',
                    'subTitle': '3 manuals, 56 artworks, 5 avatars, Beyond Divinity game-guide.'
                }
            ]
        },
        'gamesSold': {
            'title': 'Games sold so far',
            'firstGoal': {
                'currentAmount': 'React 25.000' ,
                'goalDescription': '...to unlock exclusive, never before seen, trailer from Divinity: Original Sin.'
            },
            'milestones': [
                5000,
                25000,
                50000,
                80000,
                100000
            ]
        }
    }
}

export default data;
export var headerData = data.header;
export var gamesData = data.games;
export var footerData = data.footer;
