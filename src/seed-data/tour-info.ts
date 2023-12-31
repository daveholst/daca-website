/**
 *
 * TODO - am I using this? or is it coming from the seed data in he GO seeder I wrote :thinking:
 */

export const goldenOutback = {
  title: 'Golden Outback',
  currentlyOffered: true,
  days: 5,
  loop: true,
  distance: 1000,
  basePrice: 3875, // prob derive this from pricing options - prob not required
  pricingOptions: [
    {
      name: 'Bike Inclusive',
      description: 'Includes bike hire etc.....',
      price: 4500,
    },
  ],
  coverImage: 'golden-outback-911x1024.jpg',
  hook: 'DACA tours “Golden Outback” adventure is extremely remote, and accesses parts of Australia rarely seen or driven.',
  copy: [
    "In a decade of exploring this region we're yet to see any bikes, and have completed over 1000kms regularly not coming across a single person!",
    'The riding is everything from open and fast to very challenging with densely vegetated trails and rocky breakaway country.',
    "You'll be mesmerised by all of the “Great Victoria Desert” and its unexpected woodlands, vegetation and lake systems making for a very diverse and ever-changing ride.",
    "Riding in the footprints of early explorers aboard your bike of choice through this remote land, is the most memorable riding we've ever done and we're passionate about sharing this experience with you.",
  ],
  itinerary: [
    {
      day: 1,
      title: 'Laverton - Lake Wells',
      description:
        'The outback town of Laverton was once known as the wildest Gold mining town in the west and today it is the gateway to our DACA tour adventure. We leave the town of Laverton and civilisation behind us and head north through local station roads, where you will feel the vastness of our big country as you get to know your bike and get your eye in. We will ride through the De La Poer Range with its twisting, winding and washed out tracks leading us to Lake Wells.',
    },
    {
      day: 2,
      location: 'Lake Wells - Yeo Homestead',
      description:
        "Station tracks not accessible to others and barely driven by the pastoralist are the start to the day on our way to the iconic abandoned Yeo Homestead. With a couple of hundred kms of desert trails and tracks under our belt, we will arrive to the welcoming shady verandahs of the abandoned Yeo homestead and wash the day down. Stretched back riding boots still on, we will be all smiles and in awe of the days ride through what can only be called An 'Australian Oil Painting' while absorbing the rich history of this restored homestead.",
    },
    {
      day: 3,
      location: 'Yeo Homestead - Anne Beadell',
      description:
        "We say goodbye to our 1800's character homestead and ride on down the Anne Beadell with its unique landscapes. The riding is unbelievable, winding and snaking its way between these landscapes familiar of a Nevada Desert, with you wanting to stop and conquer every spectacular hill with its panoramic views. As we head east, deep into Great Victoria Desert country you will get a true sense of remoteness, keep a close eye out for the Camels.",
    },
    {
      day: 4,
      location: 'Anne Beadell - Lake Rason',
      description:
        "Leaving the Anne Beadell our day begins with more technical riding today, on a very unused track with vegetation brushing your bars as we snake and berm our way through a forest of desert gums and spinifex lined trails for what feels an eternity. We break out of the forest into a totally new environment, sparsley vegetated dunes and ridges with a hardpac track that leads us onto the eighty km long 'Lake Rason'. Here we will watch the sun set over the lake and roll swags, before dining like kings.",
    },
    {
      day: 5,
      location: 'Lake Rason - Laverton.',
      description:
        "A sunrise over the Horizon of the lake is a print to hang on the wall at home, we skirt the lake this morning on more tight twisting tracks with tall gums lining our route. The environment is ever changing and challenging with blue gums becoming a blur before we get to the breakaway country and its rocky washouts. Every rise and fall of elevation you enter a new riding environment and never want it to end. As you ride towards our final destination your memories of the past four days and the incredible riding and great times you have experienced will be with you. As we near Laverton we ride through the ruins and old mining memorabilia of the town Burtville with its abandoned mine shafts and machinery left as a testament to how the early settlers lived and worked in the pursuit of Gold. The final 50kms of Great Victoria Desert is open and a welcome rest from the days exciting riding. This is a chance to soak it all in and reminisce of the 1000 km's of amazing and memorable riding, landscapes and great times had along the way.",
    },
  ],
}
