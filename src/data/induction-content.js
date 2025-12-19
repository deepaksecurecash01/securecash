// src/data/induction-content.js

export const INDUCTION_DATA = {
    meta: {
        title: "Banking Courier Induction",
        version: "1.0",
        passMessage: "Great job! That is correct.",
        failMessage: "Oops! Looks like one or more of your answers were incorrect. Please review the training material and try again.",
    },
    lessons: [
        {
            id: 1,
            title: "Introduction",
            modules: [
                {
                    type: "text",
                    content: `
            <p>As part of your induction to SecureCash, you will be required to read and understand our policies and procedures.</p>
            <p>This is also a legal requirement under the state Occupational Health & Safety legislation in which you perform your duties.</p>
            <p>We require you to watch these training videos and read the instruction pages in sequence as provided.</p>
            <p>To complete this entire package could take up to 2 hours to complete.</p>
            <p>Any payments made to you may be withheld and/or your employment suspended until these training questionnaire’s have been completed and answered correctly.</p>
            <p>If you have any questions at all, please feel free to telephone us on 1300 SECURE, email us on customers@securecash.com.au or join us in an online chat if completing during business hours.</p>
            <h4>Who are SecureCash?</h4>
          `
                },
                {
                    type: "video",
                    videoId: "312442368"
                },
                {
                    type: "text",
                    content: `
            <p>SecureCash specialises in picking up your money and banking it.</p>
            <p>Wherever you are, anywhere in Australia, whether you need cash collection or cash delivery, SecureCash has got you covered!</p>
            <p>Cash collection (or we call it a ‘Banking Courier Service’), is a service whereby we pick up your daily takings and deposit it to the bank, this includes cheques. The second is cash delivery (or we call it a ‘Change Order Service’), whereby we pick up cash from the bank and deliver it back to your organisation.</p>
            <p>You can use any one of our services on any number of days a week, or just on an as required basis, and we can even provide an after hour service for special events, fetes or functions!</p>
            <p>We have offices all around Australia and can provide a service in locations including Adelaide, Perth, Brisbane, Sydney, Canberra, Melbourne & everywhere in-between via our network of contractors.</p>
            <p>We do not lock you into contracts, so you if you find that our service is not suitable for your organisation then you are free to cancel at anytime, and all our customers are able to book & cancel pickups, submit cash orders and even verify the ID of our banking couriers via our website.</p>
            <p>Our banking couriers wear plain clothes and use non-security marked vehicles so as to blend in with the crowd and not draw any unwanted attention to your staff, customers and our activities, and being a national company that solely specialises in banking couriers services, along with having depots located right across Australia, makes us one of the largest and most respected cash logistics companies in this industry today.</p>
          `
                }
            ],
            quiz: {
                questions: [
                    {
                        id: "q1_1",
                        text: "What does SecureCash specialise in?",
                        options: [
                            "All aspects of courier work including parcel and document deliveries.",
                            "SecureCash specialises in picking up your money and banking it.",
                            "Security patrols and guard duties."
                        ],
                        correctIndex: 1
                    },
                    {
                        id: "q1_2",
                        text: "What major capital cities does SecureCash operate in?",
                        options: [
                            "SecureCash can collect and deliver cash anywhere, anytime, Australia wide.",
                            "Perth, Brisbane, Sydney, Adelaide, Canberra & Melbourne.",
                            "Adelaide only."
                        ],
                        correctIndex: 0
                    },
                    {
                        id: "q1_3",
                        text: "Does SecureCash use marked vehicles?",
                        options: [
                            "Yes, the SecureCash logo and security prints will discourage thieves from robbery attempts.",
                            "No, our banking couriers use non-marked vehicles to blend in with the crowd and to not draw any unwanted attention to our staff, customers and activities.",
                            "Yes, we like to draw attention to what we are doing for marketing purposes."
                        ],
                        correctIndex: 1
                    },
                    {
                        id: "q1_4",
                        text: "Will SecureCash make you sign a lockin contract?",
                        options: [
                            "No, there are no lock in contracts and the customer can cancel anytime.",
                            "Yes, there is a contract with a minimum length of 12 months."
                        ],
                        correctIndex: 0
                    }
                ]
            }
        },
        // {
        //     id: 2,
        //     title: "Banking Courier Standards",
        //     modules: [
        //         {
        //             type: "video",
        //             videoId: "312433983"
        //         },
        //         {
        //             type: "text",
        //             content: `
        //     <h2><strong>* YOU MUST WEAR PLAIN CLOTHES, NO UNIFORMS.</strong></h2>
        //     <h4>Clothing</h4>
        //     <p>All banking couriers are to wear suitable clothing and must meet the following requirements:</p>
        //     <ul>
        //         <li>Must be of a neat and casual appearance</li>
        //         <li>Not have any distinguishing logos or designs that will make you stand out in public</li>
        //         <li>Not be of a loud colour</li>
        //         <li>Not ripped or torn and clean</li>
        //         <li>Must be in good condition</li>
        //         <li>All footwear must be enclosed and appropriate to run in</li>
        //     </ul>
        //     <h4>Appearance</h4>
        //     <p>All banking couriers are to be well groomed this includes the following:</p>
        //     <ul>
        //         <li>All males must be clean shaven unless with a beard that is kept neat and trim</li>
        //         <li>Excessive make up is not to be worn</li>
        //         <li>All tattoos are to be coved up and are not to be on display, this is in regards to security</li>
        //         <li>Excessive jewellery is not to be worn</li>
        //     </ul>
        //     <p>Good personal presentation is crucial and important. Always ensure that clothing worn is neat, clean, in good repair with no offensive words or images. Polish your shoes often if necessary.</p>
        //     <p>Banking couriers are to also be mindful of personal hygiene as well. They are required to wash regularly to ensure that you have clean hair with no body or breathe odours.</p>
        //     <h4>Attitude</h4>
        //     <p>All banking couriers must have good customer service skills; a high level of importance is to be placed on the courier having these skills.</p>
        //     <p>Banking couriers that do not have good customer service skills are deemed to be not suitable.</p>
        //     <h4>Etiquette</h4>
        //     <p>Our company prides itself on the high level of customer service that we provide to all our clients. All banking couriers are to always be polite and helpful to our clients.</p>
        //     <p>Each time a banking courier greets a customer or potential customer whether it is by phone or face to face, the banking courier should always try and greet the person by name if known, or at least acknowledge them with a good morning or good afternoon.</p>
        //     <p>If the banking courier does not know the name, then they are to make an effort to remember the name.</p>
        //     <h4>Professionalism</h4>
        //     <p>To maintain our level of professionalism, it is not appropriate to instigate or encourage gossip or conversations of a personal nature.</p>
        //     <p>If a client wishes to engage in this type of conversation, then the banking courier should politely let the client talk and when the opportunity presents itself, excuse yourself by saying something like you had "better be getting on with the day".</p>
        //     <p>It is not appropriate to encourage gossip about another client, etc.</p>
        //     <p>If the client wishes to complain about the service or about another banking courier, then they are to be directed to call and/or email the area manager if necessary.</p>
        //     <p>Never engage in responding to the client or encouraging them to disclose more information. Do not give them your opinion.</p>
        //     <h4>Personal Phone Number & Email Address</h4>
        //     <p>You will never give your personal telephone number or email address to any customer under any circumstances!</p>
        //     <p>If requested, the only number you will ever give to a client is the head office number 1300 SECURE or email address customers@securecash.com.au</p>
        //     <h4>Smoking</h4>
        //     <p>As an employer, we have a duty in accordance with Occupational Health and Safety legislation to provide a safe working environment and to protect the health of all staff from hazards at the workplace.</p>
        //     <p>To protect the health of all banking couriers from the ill effects of cigarette smoke at work, the Company has adopted a policy of providing a smoke free workplace.</p>
        //     <p>Smoking is prohibited in all work places other than those designated as smoking areas. This includes company owned equipment and vehicles and client premises.</p>
        //     <p>It must be stressed, however, that breaching this policy will be dealt with in the same manner as a breach of any other Occupational Health and Safety Policy.</p>
        //     <h4>Fitness For Work</h4>
        //     <p>We are concerned at the increasing alcohol and drug misuse in the community.</p>
        //     <p>Banking couriers are prohibited from working at any time if their ability to effectively and safely perform their work is impaired by the influence of alcohol, drugs or any other substance.</p>
        //     <p>The Company recognises that alcohol and drug dependence can be an illness and encourages treatment and rehabilitation of those persons affected by such a dependency. It is our policy to support and encourage those seeking rehabilitation from alcohol and drug dependency.</p>
        //     <p>If in an opinion of the Company, a banking couriers ability is impaired by alcohol, drugs or any other substance then that banking courier will be stood down until proven otherwise.</p>
        //     <p>Every banking courier has the authority and responsibility to report to their manager if in their opinion they or any other banking courier may be under the influence or be affected by any substance that impairs the ability for a banking courier to perform their duties safely.</p>
        //     <p>The cost of all tests and rehabilitation related to substance abuse will be the responsibility of the banking courier.</p>
        //   `
        //         }
        //     ],
        //     quiz: {
        //         questions: [
        //             {
        //                 id: "q2_1",
        //                 text: "What are the 5 requirements for suitable clothing?",
        //                 options: [
        //                     "Neat casual appearance, clean, no logos that stand out, not ripped or torn. Good condition with appropriate closed footwear for walking.",
        //                     "Comfortable tank tops and thongs.",
        //                     "Uniforms that inform the public we are there to collect cash."
        //                 ],
        //                 correctIndex: 0
        //             },
        //             {
        //                 id: "q2_2",
        //                 text: "All banking courier are to be well groomed, this includes what?",
        //                 options: [
        //                     "Grooming does not matter for a covert banking courier. The more you blend in with the crowd, the better.",
        //                     "Clean shaven or neat trimmed beard. No excessive make up to be worn. Tattoos to be covered up where possible. No excessive jewelry to be worn.",
        //                     "Shave at least once a week and only cover up the most offensive tattoos. Wear just enough bling to look cool without showing off too much."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q2_3",
        //                 text: "What does good customer service skills mean?",
        //                 options: [
        //                     "Be strong and silent, rush in and out as quick as you can. If client not ready just leave.",
        //                     "Clients are not there to be spoken to, just get the money and leave as quick as you can without being disturbed.",
        //                     "Be polite and helpful at all times. Always try and greet the person by name if known, or at least acknowledge them with a good morning or good afternoon."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q2_4",
        //                 text: "What good etiquette can you show to clients on your run?",
        //                 options: [
        //                     "Waiting patiently without drawing attention to yourself if a client is with a customer. Greeting with a smile. NEVER talk on your phone in front of a client.",
        //                     "Don’t acknowledge staff and go straight to the cash room for collection.",
        //                     "Putting my phone down long enough to acknowledge staff is good etiquette."
        //                 ],
        //                 correctIndex: 0
        //             },
        //             {
        //                 id: "q2_5",
        //                 text: "What should you do if a client wishes to engage in gossip?",
        //                 options: [
        //                     "Don’t offer any opinion one way or the other. Politely let the client talk and when the opportunity presents itself, excuse yourself by saying something like you had 'better be getting on with the day'.",
        //                     "Try to get as much info as you can about what they are talking about and share any gossip you have heard too.",
        //                     "Get as much gossip as you can then post on Facebook straight away."
        //                 ],
        //                 correctIndex: 0
        //             },
        //             {
        //                 id: "q2_6",
        //                 text: "What should you do if a client wishes to complain about another banking courier?",
        //                 options: [
        //                     "The client should sort it out on their own with the respective driver.",
        //                     "Try to get as much info as you can then offer your opinion on what they should tell the other courier.",
        //                     "Direct the client to contact their key accounts manager or the SecureCash head office to resolve the issue."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q2_7",
        //                 text: "Name 3 places that smoking is prohibited whilst on duty?",
        //                 options: [
        //                     "Smoking is bad for you and you just shouldn’t smoke.",
        //                     "Client premises, company vehicles and anywhere that is not a designated as smoking area.",
        //                     "Anywhere as long as you are not seen."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q2_8",
        //                 text: "What will happen if your ability is impaired by alcohol, drugs or any other substance?",
        //                 options: [
        //                     "It is illegal to work under the influence of drugs and alcohol and you will put your job in jeopardy.",
        //                     "Some drugs are worse than others so it really depends on which ones you take.",
        //                     "It’s OK as long as you are under the legal limit."
        //                 ],
        //                 correctIndex: 0
        //             },
        //             {
        //                 id: "q2_9",
        //                 text: "Are you ever allowed to give your personal telephone number to a client?",
        //                 options: [
        //                     "Yes, if you would like to speak with the client socially.",
        //                     "No, drivers are never allowed to hand out their phone number to clients.",
        //                     "Yes, you can if you are happy with clients ringing you."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q2_10",
        //                 text: "What number are you allowed to give?",
        //                 options: [
        //                     "1300 364 569",
        //                     "1300 732 873",
        //                     "Both of the above numbers plus my personal phone number in case the client has any questions about the collection."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q2_11",
        //                 text: "Are you ever allowed to give your personal email address to a client?",
        //                 options: [
        //                     "Yes, you can if you are happy with clients contacting you on your own email address.",
        //                     "Yes, if you would like the clients contacting you socially.",
        //                     "No, drivers are never allowed to hand out their personal details to clients."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q2_12",
        //                 text: "What email are you allowed to give?",
        //                 options: [
        //                     "Tell them they need to ring us because we don’t use email.",
        //                     "Direct them to customers@securecash.com.au.",
        //                     "Take their email address and tell them you will let them know later."
        //                 ],
        //                 correctIndex: 1
        //             }
        //         ]
        //     }
        // },
        // {
        //     id: 3,
        //     title: "Armed Hold Up Procedures",
        //     modules: [
        //         {
        //             type: "video",
        //             videoId: "312433952"
        //         },
        //         {
        //             type: "text",
        //             content: `
        //     <p>Survival is the first rule during an armed hold-up. All banking couriers must protect themselves, not money or goods.</p>
        //     <p>The following steps below are to be strictly adhered to during an armed hold-up.</p>
        //     <p><strong>Stand Still</strong></p>
        //     <p>Identify the situation. The banking courier is to keep their hands where they can be seen and do not make any sudden or quick moves. Stand slightly side on to the robber. (a submissive position).</p>
        //     <p><strong>Obey The Robber's Instructions</strong></p>
        //     <p>Do exactly what you are told; allow the robber/s to leave.</p>
        //     <p><strong>Remain Calm And Quiet</strong></p>
        //     <p>Speak only when spoken to. Avoid shouting or provoking the robber. Be submissive and avoid drawing attention to yourself. Avoid staring at the robber and/or making direct eye contact.</p>
        //     <p><strong>Observe, If You Can, Safely</strong></p>
        //     <p>Make a mental note of the robber’s appearance including, hair colour, height, weight, clothing, race, age and type of weapon (Assess height markings on the doorway).</p>
        //     <p>Look for identifying characteristics including scars, tattoos and speech patterns. If it is safe to do so, write down the license number and the make, model, colour and year of the get-away car.</p>
        //     <p><strong>Stay Out Of The Danger Area</strong></p>
        //     <p>The robber is in control; do not try to outsmart them. During the holdup, do not investigate out of curiosity or bravado.</p>
        //     <p><strong>Stay Where You Are. Do Not Chase.</strong></p>
        //     <p>Leave this to the police. Observe the direction of departure and getaway car details only if safe to do so.</p>
        //     <p><strong>Call The Police</strong></p>
        //     <p>When it is safe call the police, telephone 000, make a full report to the police before discussing the hold-up with other staff.</p>
        //     <p><strong>Seal Off The Hold-Up Area</strong></p>
        //     <p>Evidence must not be touched. Any interference may destroy vital clues.</p>
        //     <p><strong>Ask Witnesses To Remain</strong></p>
        //     <p>The banking courier should ask all witnesses to remain until the police arrive.</p>
        //     <h4>Identifying Robbers</h4>
        //     <p>The police will want to interview all witnesses to an armed hold-up to try and establish the identity of the robber as quickly as possible.</p>
        //     <p>During the robbery the banking courier is to observe the following details about the robber only if they can while doing exactly as directed:</p>
        //     <ul>
        //         <li>Height</li>
        //         <li>Weight</li>
        //         <li>Clothing (including unusual marks, stains and tears)</li>
        //         <li>Age</li>
        //         <li>Hair colour</li>
        //         <li>Eye colour</li>
        //         <li>Identifying marks (scars, tattoos etc.)</li>
        //         <li>Prominent or unusual features</li>
        //         <li>Speech patterns, impediments</li>
        //         <li>Type of weapon</li>
        //     </ul>
        //     <p>Do not follow robbers when they leave the premises. Observe the following details about the get-away car only if safe to do so.</p>
        //     <ul>
        //         <li>License number</li>
        //         <li>Make</li>
        //         <li>Year</li>
        //         <li>Colour</li>
        //         <li>Direction of travel</li>
        //     </ul>
        //     <h4>Handing Over Money During A Robbery</h4>
        //     <p>Money is only to be handed over to an assailant if the banking courier is over powered, or if there is immediate threat to the life or well being (armed hold up) of the banking courier or to the life and well being of others in the vicinity.</p>
        //     <p>SecureCash must be notified immediately after the event taking place.</p>
        //     <h4>Post Hold Up Procedures</h4>
        //     <p>Following a hold-up the following procedures are in place so that first aid can be administered, psychologically traumatised persons can be treated quickly and appropriately, and the relevant authorities contacted.</p>
        //     <p>Below are the post hold-up procedures to be followed:</p>
        //     <ul>
        //         <li>As soon as it is safe to do so, the banking courier must contact the police and if necessary ambulance on the emergency number 000</li>
        //         <li>Contact the Secure Cash head office and advise them of the situation</li>
        //         <li>Injured and/or traumatised persons including members of the public should be given first aid and comforted</li>
        //         <li>Evidence must be left undisturbed, cordon off the crime area until the police have arrived</li>
        //         <li>Evidence is anything that the robber has come into contact with</li>
        //         <li>Ask all those who witnessed the crime to remain at the scene until the police arrive, if any witnesses want to leave the scene take down their names and phone numbers</li>
        //         <li>Ask witnesses to note down a description of the robber and the words used in the crime as soon as practicable, first impressions are vital</li>
        //         <li>The banking courier and other victims and witnesses should contact their families to advise them of the situation</li>
        //         <li>Assist members of the public with contacting their families or help them to their vehicles or arrange transport for them</li>
        //         <li>Make sure that you seek access to a professional post trauma counselling service; or take the option of seeing your own doctor or psychologist</li>
        //         <li>Inform other banking couriers about what has occurred and update this as necessary</li>
        //     </ul>
        //   `
        //         }
        //     ],
        //     quiz: {
        //         questions: [
        //             {
        //                 id: "q3_1",
        //                 text: "What is the first rule of an armed hold up?",
        //                 options: [
        //                     "Fight back anyway you can to take the robber down.",
        //                     "Survival is the first rule during an armed hold-up.",
        //                     "Run away from the danger as fast as you can."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q3_2",
        //                 text: "When can you hand over money during a hold up?",
        //                 options: [
        //                     "Money is only to be handed over to an assailant if the banking courier is overpowered, or if there is immediate threat to the life or well being (armed hold up) of the banking courier or to the life and well being of others in the vicinity.",
        //                     "Never, if they want the money they will need to physically take it off you.",
        //                     "As soon as you are asked to hand it over."
        //                 ],
        //                 correctIndex: 0
        //             },
        //             {
        //                 id: "q3_3",
        //                 text: "What are 3 things to do during a hold up?",
        //                 options: [
        //                     "Fight, encourage others to help and protect the money before anything else.",
        //                     "Obey the robbers instructions, remain calm, call the police when safe to do so.",
        //                     "Hide, run and keep a tight hold of the funds you are carrying."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q3_4",
        //                 text: "What are 3 things to note and remember when identifying a robber?",
        //                 options: [
        //                     "Nothing it’s best not to look up.",
        //                     "The robbers attitude, verbal cues and how they treat you.",
        //                     "Try to make a note of their appearance including hair colour, height, weight, clothing, race, age and type of weapon."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q3_5",
        //                 text: "What is meant by ‘stand still’?",
        //                 options: [
        //                     "Find a position that you are comfortable in and stay there.",
        //                     "Sitting or standing is OK as long as you ask first.",
        //                     "Keep your hands where they can be seen and do not make any sudden moves. Try to stand slightly to the side of the robber."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q3_6",
        //                 text: "When do you call the police?",
        //                 options: [
        //                     "First ring your supervisor, then call your next of kin to make sure they know you’re OK. After that you should call the police.",
        //                     "As soon as it is safe to do so.",
        //                     "After you call your supervisor."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q3_7",
        //                 text: "What is evidence?",
        //                 options: [
        //                     "Anything the robber may have come in contact with or touched.",
        //                     "Evidence is what other people have heard.",
        //                     "Your statement on what you think may help the police catch the robber."
        //                 ],
        //                 correctIndex: 0
        //             },
        //             {
        //                 id: "q3_8",
        //                 text: "What are 3 things to do after a hold up?",
        //                 options: [
        //                     "Just finish up for the day and go home, after such a stressful event you deserve some time off.",
        //                     "Call Police, call head office then as best as you can seal off the crime scene. Assist anyone who may be injured. Ask witnesses to stay and speak with the police.",
        //                     "Drive straight back to the office and tell your supervisor what happened."
        //                 ],
        //                 correctIndex: 1
        //             }
        //         ]
        //     }
        // },
        // {
        //     id: 4,
        //     title: "Insurance Limits",
        //     modules: [
        //         {
        //             type: "text",
        //             content: `
        //     <p>SecureCash holds an insurance policy to cover stolen (via a robbery only).</p>
        //     <p>The policy in short form covers all banking couriers for cash carried up to AUD $50,000 (Fifty Thousand Dollars).</p>
        //     <p>A banking courier will not be covered at all, even up to $50,000 if they carry $0.01 over.</p>
        //     <p>You, the banking courier will be liable for the whole $50,000 + every $0.01 over that you carry!</p>
        //     <p>A banking courier is to never accept 1c more than this amount from any client during a collection.</p>
        //     <p>If a client hands a banking courier more than $50,000 the following is to occur:</p>
        //     <ul>
        //         <li>The banking courier is to contact their manager and notify them</li>
        //         <li>The banking courier is to request the client breakdown the total amount into a number of smaller amounts each limited $50,000 in cash</li>
        //         <li>Each amount is to be placed into the appropriate tamper evident serial numbered satchel</li>
        //         <li>The courier is to take one satchel at a time to the bank, and once banked return to the client to collect the next satchel</li>
        //         <li>Each satchel is to be banked in sequence</li>
        //     </ul>
        //     <p>The whole policy is void if you carry even 1c over the limit of $50,000.</p>
        //     <p>Cheques do not have a dollar limit on them and can be of an unlimited amount unless they are written out to “CASH”.</p>
        //     <p>Any cheque written out to cash must be treated as cash and must be limited to $50,000.</p>
        //     <p>Cash is not covered in an unattended vehicle and must accompany the banking courier at all times.</p>
        //     <p>You are not covered if cash is stolen from your vehicle and the banking courier will be financially responsible for any cash that is stolen.</p>
        //     <h4>In Summary</h4>
        //     <p>At no time is the banking courier to have 1c more in their possession than $50,000 AUD in cash.</p>
        //     <p>If a banking courier finds that a client wishes to deposit more than $50,000 AUD in cash then two collections are to be made, the docket book must reflect this second collection.</p>
        //     <p>Please read this letter from Ausure Insurance Brokers confirming the above:</p>
        //   `
        //         },
        //         {
        //             type: "image",
        //             src: "https://www.securecash.com.au/content/images/induction/insurance-letter.png",
        //             alt: "Insurance Letter"
        //         }
        //     ],
        //     quiz: {
        //         questions: [
        //             {
        //                 id: "q4_1",
        //                 text: "Is cash covered in an unattended vehicle?",
        //                 options: [
        //                     "It is covered if the courier has a clear line of sight to the vehicle.",
        //                     "Yes, it is covered.",
        //                     "Cash is not covered in an unattended vehicle and must accompany the banking courier at all times."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q4_2",
        //                 text: "Who is responsible to pay back any cash stolen from an unattended vehicle?",
        //                 options: [
        //                     "The insurance company.",
        //                     "The courier will be financially responsible for any cash that is stolen from an unattended vehicle.",
        //                     "The client is responsible."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q4_3",
        //                 text: "How much cash can you have in your possession at any one time (insurance limit coverage)?",
        //                 options: [
        //                     "You can carry as much as you are comfortable with.",
        //                     "Couriers are covered to carry up to $50,000 from each client.",
        //                     "Couriers are covered to carry in total up to $50,000 in cash."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q4_4",
        //                 text: "What do you do if the client hands you more than what the insurance limit coverage is?",
        //                 options: [
        //                     "The courier is to contact their manager and notify them. If possible the courier should ask the client to break down the total amount into a number of smaller amounts...",
        //                     "You proceed with the collection as usual but ask the client to bag the cash in smaller amounts next time.",
        //                     "You take it to the bank and make sure to be VERY careful."
        //                 ],
        //                 correctIndex: 0
        //             },
        //             {
        //                 id: "q4_5",
        //                 text: "What if a cheque is written out to cash, is this to be included in the insurance limit?",
        //                 options: [
        //                     "Cheques are not real money so even if made out to “Cash” it doesn’t matter.",
        //                     "Any cheque written out to cash must be treated as cash and must be limited to $50,000.",
        //                     "No, cheques are separate to cash even if they are made out to “Cash”."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q4_6",
        //                 text: "Please explain what the letter from Jarrod O’Brien means?",
        //                 options: [
        //                     "The letter states that we will be covered if a loss happens.",
        //                     "You will always be covered by insurance no matter what.",
        //                     "You are not covered by insurance if you are carrying anything above your limit."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q4_7",
        //                 text: "What happens if you carry $0.01 more than the insurance limit?",
        //                 options: [
        //                     "The whole policy is void if you carry even 1c over the limit of $50,000.",
        //                     "You will still be covered for the first $50,000.",
        //                     "The insurance covers $50,000 and you cover the rest."
        //                 ],
        //                 correctIndex: 0
        //             },
        //             {
        //                 id: "q4_8",
        //                 text: "Who is responsible if you have $0.01 more than the insurance limit in your possession and you are robbed?",
        //                 options: [
        //                     "The insurance company.",
        //                     "The client will be responsible for the loss of their funds.",
        //                     "The courier is liable for the full amount if they have breached their limit."
        //                 ],
        //                 correctIndex: 2
        //             }
        //         ]
        //     }
        // },
        // {
        //     id: 5,
        //     title: "Docket Books",
        //     modules: [
        //         {
        //             type: "video",
        //             videoId: "312438369"
        //         },
        //         {
        //             type: "text",
        //             content: `
        //     <p>* Please note, yellow dockets as referred to in this questionnaire are in the process of being fazed out at the time of this questionnaire being written.</p>
        //     <p>The docket book is your proof that you have handed all money collected from a client to the bank. If you do not fill in the docket book correctly and record all information accurately, then you will be legally liable if in the event that a satchel and/or cash goes missing!</p>
        //     <p><span style="text-decoration:underline;"><strong>NEVER, EVER PUT SATCHELS DOWN AN EXPRESS DEPOSIT CHUTE WITHOUT GETTING A BANK STAMP!!!</strong></span></p>
        //     <p>Before collecting the banking from a client you must make sure that all sections of the docket book has been filled in correctly by the customer.</p>
        //     <p>Below is an actual docket from a docket book issued and kept at the clients premises;</p>
        //   `
        //         },
        //         {
        //             type: "image",
        //             src: "https://www.securecash.com.au/content/images/induction/docket-book/page.jpg",
        //             alt: "Docket Book Page"
        //         },
        //         {
        //             type: "text",
        //             content: `
        //     <p>The customer must have already have prepared the “Organisation name and address” there may be a chain of clients and simply recording the name of the store is not enough which is why we insist that they also record their address.</p>
        //     <p><span style="text-decoration:underline;"><strong>NEVER, EVER PUT SATCHELS DOWN AN EXPRESS DEPOSIT CHUTE WITHOUT GETTING A BANK STAMP!!!</strong></span></p>
        //     <p>The pickup date and time is also essential and needs to be recorded at the time of collection by the customer.</p>
        //   `
        //         },
        //         {
        //             type: "image",
        //             src: "https://www.securecash.com.au/content/images/induction/docket-book/customer-details.jpg",
        //             alt: "Docket Book Customer Details"
        //         },
        //         {
        //             type: "text",
        //             content: `
        //     <p>Satchels to be collected is important to have filled in correctly not only for insurance purposes but also for the security of the money you are taking responsibility for.</p>
        //     <p>Each section needs to be completed by the customer before the banking courier can sign for acceptance.</p>
        //     <p>Satchel serial number, cheque amount and cash amount, remember you can never accept more than $50K in cash as this is will breach your insurance limit and leave you vulnerable.</p>
        //   `
        //         },
        //         {
        //             type: "image",
        //             src: "https://www.securecash.com.au/content/images/induction/docket-book/satchels.jpg",
        //             alt: "Docket Book Satchels"
        //         },
        //         {
        //             type: "text",
        //             content: `
        //     <p>Once the banking courier has confirmed all the above is correct and that you have the correct number of sealed bags that are recorded on the docket book you may then sign for acceptance of the bags, remember to both clearly print your name and sign.</p>
        //   `
        //         },
        //         {
        //             type: "image",
        //             src: "https://www.securecash.com.au/content/images/induction/docket-book/signature.jpg",
        //             alt: "Docket Book Signature"
        //         },
        //         {
        //             type: "text",
        //             content: `
        //     <p>If you are performing a change order at the time of collection this must also be recorded on the docket book.</p>
        //     <p><span style="text-decoration:underline;"><strong>NEVER, EVER PUT SATCHELS DOWN AN EXPRESS DEPOSIT CHUTE WITHOUT GETTING A BANK STAMP!!!</strong></span></p>
        //     <p><span style="text-decoration:underline;"><strong></strong></span>Simply record the cash amount of the change order then have the customer sign as receipt of the cash, again please make sure they clearly print their name and sign.</p>
        //   `
        //         },
        //         {
        //             type: "image",
        //             src: "https://www.securecash.com.au/content/images/induction/docket-book/change-order.jpg",
        //             alt: "Docket Book Change Order"
        //         },
        //         {
        //             type: "text",
        //             content: `
        //     <p>Once all is completed you will see the dockets are recorded in triplicate, you will need to tear off the top two copies (white and yellow) and leave the last copy (green page) in the book for the client.</p>
        //     <p>The white copy is to stay with the banking courier to be handed into the area manager as proof of delivery while the yellow copy can be handed to the banks when satchels are deposited.</p>
        //     <p>A "Proof of Delivery" bank stamp MUST be obtained and recorded on the docket book by the teller as well as recording the name of the bank and the branch location.</p>
        //     <p><span style="text-decoration:underline;"><strong>NEVER, EVER PUT SATCHELS DOWN AN EXPRESS DEPOSIT CHUTE WITHOUT GETTING A BANK STAMP!!!</strong></span></p>
        //     <p>In the case of the National Australia Bank (NAB), on your run sheet you will be directed to the nearest branch that has installed an automated deposit machine.</p>
        //     <p>This machine will give you a printed receipt for each satchel that you deposit.</p>
        //     <p><strong>PLEASE NOTE:</strong> You are able to scan multiple satchels on the one receipt, so only ever scan the same customers satchels on the one receipt, never mix multiple customers satchels together on the one receipt.</p>
        //   `
        //         },
        //         {
        //             type: "image",
        //             src: "https://www.securecash.com.au/content/images/induction/docket-book/proof.jpg",
        //             alt: "Docket Book Proof"
        //         },
        //         {
        //             type: "text",
        //             content: `
        //     <p><strong><a href="https://www.google.com/maps/d/u/0/viewer?ll=-14.546064098130591%2C113.14115609302064&hl=en&z=7&mid=1xCTM6igAw0K2YK0Z-du1gZEsyk4" target="_blank">Google Map Of Authorised Drop, Stamp & Go Locations Per Bank Around Australia</a></strong></p>
        //     <p><strong>Blue</strong> = BankSA*<br><strong>Yellow</strong> = Commonwealth Bank*<br><strong>Red</strong> = Westpac Bank*<br><strong>Black</strong> = NAB*<br><strong>Green</strong> = Suncorp Bank*</p>
        //     <p>* Subject to change through out the year, if SecureCash has been made aware of a change in location then the map will be updated.</p>
        //     <p><strong>PLEASE NOTE:</strong> Banking couriers may have developed relationships with various banks and branches that will provide a bank stamp as proof of deposit, if this that is the case then we strongly encourage them to continue that relationship rather than using these locations issued as the official drop, stamp & go locations.</p>
        //     <h4>How to handle a 'Cancelled on Arrival' situation:</h4>
        //   `
        //         },
        //         {
        //             type: "video",
        //             videoId: "312438941"
        //         }
        //     ],
        //     quiz: {
        //         questions: [
        //             {
        //                 id: "q5_1",
        //                 text: "What must be recorded in the docket book?",
        //                 options: [
        //                     "The satchel numbers and amounts only.",
        //                     "Organisation name, date and time, customer name and signature, courier name and signature, deposit bag numbers and amounts.",
        //                     "As long as the client signs it the what is written is not important."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q5_2",
        //                 text: "Who fills in the organisation name and address?",
        //                 options: [
        //                     "The courier is responsible for filling in these details.",
        //                     "The bank teller will fill in these details.",
        //                     "The client must fill in their own details."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q5_3",
        //                 text: "Can a banking courier sign for a bag that is not recorded on the docket book?",
        //                 options: [
        //                     "Yes, you have to if you have collected it.",
        //                     "No, never sign for a bag not in the docket book.",
        //                     "Yes, you can if you make sure to deposit it on the same day."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q5_4",
        //                 text: "What is the cash limit you can accept on any one collection?",
        //                 options: [
        //                     "$50,000 in cash for any one collection.",
        //                     "$49,999 in cash for any one collection.",
        //                     "As much as you are comfortable carrying."
        //                 ],
        //                 correctIndex: 0
        //             },
        //             {
        //                 id: "q5_5",
        //                 text: "Does the customer or banking courier need to sign for a cash delivery?",
        //                 options: [
        //                     "There is no need for the client or the courier to sign for a cash delivery.",
        //                     "The courier can sign on behalf of the client.",
        //                     "The customer needs to sign as confirmation that they have received the cash delivery."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q5_6",
        //                 text: "What colour copies do you take with you?",
        //                 options: [
        //                     "The courier needs to tear off the top white copy to take with them.",
        //                     "The yellow duplicate copy.",
        //                     "Either copy is acceptable."
        //                 ],
        //                 correctIndex: 0
        //             }
        //         ]
        //     }
        // },
        // {
        //     id: 6,
        //     title: "Docket Archive System",
        //     modules: [
        //         {
        //             type: "text",
        //             content: `
        //     <p>Once you have deposited the clients money into the bank and obtained a bank stamp or electronic receipt as proof of delivery, we then immediately require you to upload the docket + receipt (if applicable) into our docket archive system.</p>
        //     <p>There are many reasons why the docket must be immediately uploaded, however the main reason is due to the Federal Governments Anti-Money Laundering and Counter-Terrorism Financing Act 2006.</p>
        //     <p>SecureCash is required to develop and maintain a program which covers the responsibilities and illustrates how the responsibilities will be met according to this Act.</p>
        //     <p>SecureCash is required to report deposits made by it's banking couriers and/or authorised representatives.</p>
        //     <p>Failure to do so may result in the following;</p>
        //     <p style="color:red;">'Penalty unit' is defined in section 4AA of the Crimes Act 1914.</p>
        //     <p style="color:red;">Penalty units are used to describe the amount payable for fines under commonwealth laws, including under the Anti-Money Laundering and Counter-Terrorism Financing Act 2006 (AML/CTF Act).</p>
        //     <p style="color:red;">Fines are calculated by multiplying the value of one penalty unit by the number of penalty units prescribed for the offence.</p>
        //     <p style="color:red;">One penalty unit is $210.</p>
        //     <p style="color:red;">Penalty units are reviewed every three years…."</p>
        //     <p><strong>Source:</strong> <a href="http://www.austrac.gov.au/enforcement-action/penalty-units" target="_blank">http://www.austrac.gov.au/enforcement-action/penalty-units</a></p>
        //     <p>The following video explains how to upload your completed docket into our system.</p>
        //     <p><strong>Please Note:</strong> The docket archive system is updated regularly as SecureCash's requirements and responsibilities change and more information is required to be recorded.</p>
        //     <p>However this video still explains the basics, just be aware that more information is requested on the current version.</p>
        //     <p>The docket Archive System can be found at the following address:</p>
        //     <p><a href="https://www.securecash.com.au/dockets/">https://www.securecash.com.au/dockets/</a></p>
        //     <h2>How To Use Our Docket Archive System</h2>
        //   `
        //         },
        //         {
        //             type: "video",
        //             videoId: "312438360"
        //         }
        //     ],
        //     quiz: {
        //         questions: [
        //             {
        //                 id: "q6_1",
        //                 text: "What is the website address for uploading dockets?",
        //                 options: [
        //                     "www.securecash.com.au",
        //                     "https://www.securecash.com.au/dockets",
        //                     "SecureCash"
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q6_2",
        //                 text: "What is the main reason we ask for dockets to be uploaded?",
        //                 options: [
        //                     "To show the banks.",
        //                     "To show the job has been completed.",
        //                     "Federal Government’s Anti-Money Laundering and Counter-Terrorism Financing Act 2006."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q6_3",
        //                 text: "How long do you have to submit a docket online once the job is completed?",
        //                 options: [
        //                     "Once a week.",
        //                     "Anytime before the end of the month.",
        //                     "Drivers are asked to at least upload prior to business starting the next day."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q6_4",
        //                 text: "What is one penalty fine amount for not submitting your report in time to Austrac?",
        //                 options: [
        //                     "One penalty unit is $210.",
        //                     "One penalty unit is $500.",
        //                     "The judge will determine the amount."
        //                 ],
        //                 correctIndex: 0
        //             }
        //         ]
        //     }
        // },
        // {
        //     id: 7,
        //     title: "Information Security & Confidentiality",
        //     modules: [
        //         {
        //             type: "video",
        //             videoId: "312438665"
        //         },
        //         {
        //             type: "text",
        //             content: `
        //     <h4>Security Of Keys</h4>
        //     <p>From time to time a banking courier may be required be issued with a key to enter into a clients premises and/or to open a safe.</p>
        //     <p>Keys are to never be labelled with any location information and must be identified only by code.</p>
        //     <p>Keys are not to be kept on the same key ring as keys for other clients and/or to be kept on a chain.</p>
        //     <p>Keys are the responsibility of the banking courier and the custodian of the key/s is 100% financially liable if they are lost or stolen, this may include the following:</p>
        //     <ul>
        //         <li>Reissuing of the lost key/s to all previous key holders</li>
        //         <li>The replacement or opening of the affected safe</li>
        //         <li>The replacement and reissuing of door locks</li>
        //     </ul>
        //     <p>Banking couriers are to ensure that the key for a particular service is secured at all times when not in use and is immediately returned and re-secured to the vehicle when it is no longer required.</p>
        //     <p>Keys are not permitted to be secured with any cash.</p>
        //     <h4>Security Of Information</h4>
        //     <p>All information that is entrusted to a banking courier is to be kept out of view to the public, this can include:</p>
        //     <ul>
        //         <li>Bank tellers</li>
        //         <li>People in bank queue, (Especially security guards from rival companies & potential robbers)</li>
        //         <li>Other clients</li>
        //         <li>Friends and/or family</li>
        //     </ul>
        //     <p>Under no circumstances is confidential information to be left on display in a vehicle regardless if the vehicle is attended on not, this includes but not limited to:</p>
        //     <ul>
        //         <li>Any operating procedures</li>
        //         <li>Run lists</li>
        //         <li>Completed dockets</li>
        //         <li>Client information and/or contact details</li>
        //     </ul>
        //     <p>Bank tellers are to never be given and/or trusted with any sensitive or confidential information pertaining clients or operations.</p>
        //     <p>Just like they do not give and/or trust us with accessing information pertaining to the bank accounts of our clients.</p>
        //     <p>Remember; you are not the only banking courier that a bank teller speaks to in their day, and you cannot guarantee that any information you have given them will not be passed on.</p>
        //     <p>There's an old saying 'Loose lips sinks ships'.</p>
        //     <h4>Security Of Cash</h4>
        //     <p>Cash that has not been banked must not be left in vehicle unattended. All un-banked cash must be in the possession of the banking courier at all times.</p>
        //     <p>All cash that is collected must be stored during transit in a lock box.</p>
        //     <p>The lock box is to be secured to the vehicle in either one of the following methods:</p>
        //     <ul>
        //         <li>Welded to the structure of the vehicle</li>
        //         <li>Bolted to the structure of the vehicle</li>
        //         <li>Chained to the structure of the vehicle</li>
        //     </ul>
        //     <p>All lock boxes must be locked by the means of a key or combination padlock. Keys and/or codes for the padlocks must never be left in the vehicle and must always be in the possession of the banking courier.</p>
        //     <p>All lock boxes must be out of view from the public and must be covered by a blanket or sheet if they can be seen through any window of the vehicle.</p>
        //     <p>All lock boxes must be made of steel and have the following:</p>
        //     <ul>
        //         <li>Be of no less than 2 mm in thickness</li>
        //         <li>Constructed by a reputable manufacturer</li>
        //         <li>Be able to be locked via a padlock</li>
        //         <li>Have provisions to be able to be secured to a vehicle chassis by chain or by internal screws</li>
        //     </ul>
        //     <h4>Confidentiality Agreements</h4>
        //     <p>Basically confidential information means all information belonging to the Company which is confidential and commercially sensitive, including but not limited to information concerning the nature, location and capabilities of clients, pricing structure, operating procedures, methods and strategies.</p>
        //     <p>All banking couriers must agree to a confidentiality agreement as part of their induction and renew it periodically throughout their employment;</p>
        //   `
        //         }
        //     ],
        //     quiz: {
        //         questions: [
        //             {
        //                 id: "q7_1",
        //                 text: "How are keys to be secured?",
        //                 options: [
        //                     "Label them and keep them at the clients premises.",
        //                     "On the same key ring as keys for other clients and/or kept on a chain.",
        //                     "Keys should be stored in a lock box in a safe location."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q7_2",
        //                 text: "Why must you never disclose sensitive or confidential information to a bank teller?",
        //                 options: [
        //                     "You are not the only courier that a teller speaks to in their day, and you cannot guarantee that any information you have given them will not be passed on.",
        //                     "Bank tellers can’t be trusted."
        //                 ],
        //                 correctIndex: 0
        //             },
        //             {
        //                 id: "q7_3",
        //                 text: "How is money to be secured whilst in transit in your vehicle?",
        //                 options: [
        //                     "Just keep it in your pockets.",
        //                     "Anywhere inside your vehicle as long as your vehicle is locked.",
        //                     "Ideally money should be secured in a lock box inside your vehicle."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q7_4",
        //                 text: "What must be done with cash not yet banked?",
        //                 options: [
        //                     "Left in your unattended car.",
        //                     "All unbanked cash must be kept in the possession of the courier at all times.",
        //                     "Try to get another bank to take it."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q7_5",
        //                 text: "What does confidential information include?",
        //                 options: [
        //                     "It’s ok to pass on some info as long as they agree not to pass it on.",
        //                     "Any and all information that relates to a client.",
        //                     "Some client information is ok to pass on."
        //                 ],
        //                 correctIndex: 1
        //             }
        //         ]
        //     }
        // },
        // {
        //     id: 8,
        //     title: "Identification Methods",
        //     modules: [
        //         {
        //             type: "video",
        //             videoId: "312438646"
        //         },
        //         {
        //             type: "text",
        //             content: `
        //     <p>SecureCash has introduced three methods for it's clients to identify it's banking couriers.</p>
        //     <p><strong>1. Telephone</strong></p>
        //     <p>Clients can call the SecureCash head office on 1300 SECURE, and one of our operators will happily verify that the banking courier currently at their premises is authorised to collect their banking.</p>
        //     <p><strong>2. Online Services</strong></p>
        //     <p>All clients when they signup will be allocated a username and password to access the SecureCash online services portal located at;</p>
        //     <p><a href="https://www.securecash.com.au/onlineservices/">https://www.securecash.com.au/onlineservices/</a></p>
        //     <p>Once logged on, they will be able to click the 'Authorised Banking Courier' tab and manually verify if the banking courier currently at their premises is authorised to collect their banking.</p>
        //     <p><strong>3. QR Code</strong></p>
        //     <p>All banking couriers issued with a SecureCash identification will have printed on the front a QR code (Quick Response Code).</p>
        //     <p>All a client needs to do is download a once off QR reader app from their corresponding mobile phone providers app store.</p>
        //     <p>Once scanned, the app will instantly advise the client if the banking courier currently at their premises is authorised to collect their banking.</p>
        //   `
        //         }
        //     ],
        //     quiz: {
        //         questions: [
        //             {
        //                 id: "q8_1",
        //                 text: "Name three ways the customer can verify you as authorised SecureCash driver?",
        //                 options: [
        //                     "Check if the photo on the ID looks correct.",
        //                     "Scan the QR Code on the ID, check if the driver is listed in our online services or phone the SecureCash head office to confirm.",
        //                     "Ask the driver if he’s ok."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q8_2",
        //                 text: "Are electronic copies of ID’s kept on your phone acceptable?",
        //                 options: [
        //                     "No, we only print off ID’s.",
        //                     "No, we can email ID’s on request.",
        //                     "Yes, that is the preferred method we keep our ID’s."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q8_3",
        //                 text: "What is the website and phone number to verify an ID?",
        //                 options: [
        //                     "https://www.securecash.com.au/onlineservices and 1300 732 873.",
        //                     "SecureCash.com.au and 1300 364 569.",
        //                     "The only way to verify an ID is to scan the QR code."
        //                 ],
        //                 correctIndex: 0
        //             }
        //         ]
        //     }
        // },
        // {
        //     id: 9,
        //     title: "Cash Handling Procedures",
        //     modules: [
        //         {
        //             type: "video",
        //             videoId: "312434006"
        //         },
        //         {
        //             type: "text",
        //             content: `
        //     <p>All cash that is collected must be collected from the client within a tamper evident serial numbered satchel. All satchels must be recorded by the client in their issued docket book. </p>
        //     <p>The banking courier must sign for each satchel that they collect against the satchels recorded in the docket book by the client.</p>
        //     <p>The banking courier is to never under any circumstances accept a satchel from the client that has tamper evident marks on the security seal.</p>
        //   `
        //         },
        //         {
        //             type: "image",
        //             src: "https://www.securecash.com.au/content/images/induction/tamper-evident-satchel.png",
        //             alt: "Tamper Evident Satchel"
        //         },
        //         {
        //             type: "text",
        //             content: `
        //     <p>If the banking courier accepts such a satchel then complete and total liability of the content of the satchel transfers to the banking courier if the satchel is deficient.</p>
        //     <p><strong>Broken Satchels</strong></p>
        //     <p>On occasions an express deposit satchel (EDS) will break or become temper evident due to the use of a deposit chute.</p>
        //     <p>When this happens we are to provide a free pickup andreturn of the EDS for the client when convenient to us.</p>
        //     <p>Depending on the nature of the broken satchel, the banking courier may stand in front of the bank teller and re-bag the satchel and deposit back into the EDC or return the broken satchel back to the client.</p>
        //     <p>Usually the client will receive a phone call from the bank that it was deposited at, the client will in turn contact either the area manager or head office direct.</p>
        //     <p>Depending on the relationship with the branch in question, the banking courier may require authorisation to pick up the EDS, the authorisation must be in writing using the customers letterhead.</p>
        //     <p>This letter is to be signed and then faxed or emailed back to bank.</p>
        //     <p>If a satchel is to be returned back to the client, then it must be placed into another type of tamper evident satchel, witnessed by the bank teller and then the serial number of this satchel be recorded on the ‘White Docket’ and ‘Yellow Docket’ with the bank teller keeping the ‘Yellow Docket’ for their records.</p>
        //     <p><strong>Raw Cash</strong></p>
        //     <p>Under no circumstances are banking couriers to ever collect ‘raw’ and/or ‘open’ cash that is to be deposited from a client.</p>
        //     <p>All cash must be contained within a sealed (not open) serial number tamper evident satchel of some description.</p>
        //     <h4>Introduction To Tamper Evident Satchels</h4>
        //   `
        //         },
        //         {
        //             type: "video",
        //             videoId: "312439110"
        //         },
        //         {
        //             type: "text",
        //             content: `<h4>How To Deposit Satchels At A Bank, Over The Counter</h4>`
        //         },
        //         {
        //             type: "video",
        //             videoId: "312439020"
        //         },
        //         {
        //             type: "text",
        //             content: `<h4>How To Use 'Automatic Deposit Machines'</h4>`
        //         },
        //         {
        //             type: "video",
        //             videoId: "312438847"
        //         }
        //     ],
        //     quiz: {
        //         questions: [
        //             {
        //                 id: "q9_1",
        //                 text: "All cash that is collected must be collected from the client within what?",
        //                 options: [
        //                     "A paper envelope.",
        //                     "Tamper evident, serial numbered satchels.",
        //                     "Any bag that can be sealed."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q9_2",
        //                 text: "You must never, under any circumstances, accept a satchel from the client that has what?",
        //                 options: [
        //                     "More than one colour.",
        //                     "Less than $100 inside the bag.",
        //                     "Been torn or tampered with."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q9_3",
        //                 text: "If you accept such a satchel then what are the consequences?",
        //                 options: [
        //                     "The client will need to accept full responsibility.",
        //                     "The driver will be liable for any losses incurred from accepting a faulty bag.",
        //                     "It will be up to the bank teller."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q9_4",
        //                 text: "What two things may a banking courier do with a broken satchel?",
        //                 options: [
        //                     "Re bag it yourself and phone the client to advise what happened.",
        //                     "Deposit down the chute as quick as you can and record the details.",
        //                     "Return to the client to be re bagged or deposit over the counter and have the teller verify contents."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q9_5",
        //                 text: "If a satchel is to be returned back to the client, then it must be placed into what?",
        //                 options: [
        //                     "If the bag is broken then it should be sealed in a separate tamper proof bag in order to not lose anything.",
        //                     "Your backpack or carry bag.",
        //                     "Into your pocket."
        //                 ],
        //                 correctIndex: 0
        //             }
        //         ]
        //     }
        // },
        // {
        //     id: 10,
        //     title: "AUSTRAC - Anti Money Laundering",
        //     modules: [
        //         {
        //             type: "video",
        //             videoId: "312433928"
        //         },
        //         {
        //             type: "text",
        //             content: `
        //     <p>The Anti-Money Laundering and Counter Terrorism Financing Act was enacted in 2006.</p>
        //     <p>AUSTRAC is Australia's anti-money laundering and counter-terrorism financing regulator and specialist financial intelligence unit. AUSTRAC is short for Australian Transaction Reports and Analysis Centre.</p>
        //     <p>AUSTRAC works together with Australian industries and businesses in their compliance with anti-money laundering and counter-terrorism financing legislation.</p>
        //     <p>The broad purpose of the AML Act is to regulate financial transactions in a way that will help detect and prevent money laundering and terrorism financing.</p>
        //     <p>As Australia's financial intelligence unit, AUSTRAC contributes to investigative and law enforcement work to fight financial crime and prosecute criminals in Australia and overseas.</p>
        //     <p>Money laundering involves injection of funds generated from illegal activities into the legitimate financial system in order to hide or disguise the criminal source of those funds.</p>
        //     <p>Terrorism financing is the use of money, which may or may not be generated from criminal activity, for financing terrorist activities.</p>
        //     <p>As a cash in transit provider, SecureCash is obligated under the Anti-Money Laundering and Counter Terrorism Financing Act 2006 to perform several activities.</p>
        //     <p>SecureCash is required to develop and maintain a program which covers the responsibilities and illustrates how the responsibilities will be met according to the Act.</p>
        //     <p>SecureCash is also responsible to maintain appropriate records and to submit reports to AUSTRAC.</p>
        //     <p>The AML Act adopts a risk-based approach. This approach means that the reporting entity such as SecureCash need to decide how best to assess and mitigate the risk of money laundering and financing of terrorism through its business. Reporting entities are required to undertake a comprehensive assessment of these risks relative to their businesses.</p>
        //     <p>SecureCash is required to demonstrate to AUSTRAC that they have carried out such an assessment and have a program in place to identify, mitigate and manage the risk of their products or services being used to facilitate money laundering or the financing of terrorism.</p>
        //     <p>The key obligations of a reporting entity such as SecureCash include record keeping requirements in relation to transactional records and compliance reporting to AUSTRAC.</p>
        //     <p>The following are required of the Company:</p>
        //     <ul>
        //         <li>Have prescribed procedures in place to verify a customer’s identity before providing a designated service</li>
        //         <li>Develop and maintain an AML/CTF program</li>
        //         <li>Have in place an AML/CTF ACO</li>
        //         <li>Comply with record keeping requirements in relation to records of identification procedures and records about AML/CTF programs</li>
        //         <li>Report to AUSTRAC suspicious matters and transactions above a certain threshold</li>
        //         <li>Undertake ongoing customer due diligence</li>
        //     </ul>
        //     <p>An important aspect of the compliance of a reporting entity is the AML/CTF program. An AML/CTF program is divided into two parts:</p>
        //     <p><strong>Part A</strong></p>
        //     <p>Designed to identify, mitigate and manage the risk that a reporting entity may reasonably face that the provision of designated services might involve or facilitate money laundering or financing of terrorism.</p>
        //     <p>Included in Part A will be the requirement for a reporting entity to;</p>
        //     <p>Have an employee due diligence program for screening prospective employees as well as other employees who may be in a position to facilitate money laundering or terrorist financing.</p>
        //     <p>Have an AML/CTF risk awareness training program so that employees receive appropriate training on the money laundering and terrorist financing risk that the reporting entity may face.</p>
        //     <p>Designate a person at management level as the AML/CTF ACO.</p>
        //     <p>Part A of the AML/CTF program must be approved by and be subject to ongoing oversight by the reporting entity’s senior management. It must also be subject to regular independent review which may be conducted internally or externally.</p>
        //     <p><strong>Part B</strong></p>
        //     <p>Sets out the reporting entity’s customer identification procedures. These procedures include prescribed processes for the collection and verification of “Know Your Customer Information” and requirements for a reporting entity to have appropriate risk based systems and controls to determine what (if any) other information will be collected.</p>
        //     <p>A reporting entity is required to consider certain factors when identifying its exposure to money laundering and terrorist financing. These include consideration of its customer types, the types of designated services it provides and the methods by which those services are delivered.</p>
        //     <p>All staff will need to be aware of their activities in the course of their work in relation to anti money laundering and terrorism financing.</p>
        //     <p>Most of the obligations for SecureCash will be the responsibility of the ACO; however, as the day to day contact for our clients, our staff have the opportunity to observe any suspicious matter. The front line staff may also be witness to suspicious activities or receive suspicious queries from clients.</p>
        //     <p>If any of our staff observe suspicious activities or receive suspicious queries, they should report the matter to SecureCash immediately for further investigation.</p>
        //     <p>Such suspicious queries could be where the client requests a collection from an unfamiliar location, or a delivery to an unfamiliar destination.</p>
        //   `
        //         }
        //     ],
        //     quiz: {
        //         questions: [
        //             {
        //                 id: "q10_1",
        //                 text: "What is the name of the act?",
        //                 options: [
        //                     "Australian Federal Police",
        //                     "Australian Transaction Reports and Analysis Centre",
        //                     "Australian Tax Department"
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q10_2",
        //                 text: "What is the main purpose of the act?",
        //                 options: [
        //                     "Check that clients are paying taxes.",
        //                     "Detect and prevent money laundering and terrorism financing.",
        //                     "Check that banks are declaring funds for tax purposes."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q10_3",
        //                 text: "What are three of the requirements of the act that the company needs to comply with?",
        //                 options: [
        //                     "Tell each driver to do their own AML/CTF plan, report to AUSTRAC suspicious matters if you feel threatened only, ask the banks if they are happy with client.",
        //                     "Have an ABN, your own TFN and a current driver's license.",
        //                     "Have in place an AML/CTF ACO, report to AUSTRAC suspicious matters and transactions above a certain threshold, undertake ongoing customer due diligence."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q10_4",
        //                 text: "How many parts are included in the AML/CTF program?",
        //                 options: [
        //                     "Just the one.",
        //                     "Four parts.",
        //                     "Two parts."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q10_5",
        //                 text: "What is Part B of the program all about?",
        //                 options: [
        //                     "Making sure clients are going to be able to pay their invoices.",
        //                     "The reporting entity’s customer identification procedures.",
        //                     "Employee due diligence program."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q10_6",
        //                 text: "When was the AUSTRAC act enacted?",
        //                 options: [
        //                     "2018",
        //                     "1996",
        //                     "2006"
        //                 ],
        //                 correctIndex: 2
        //             }
        //         ]
        //     }
        // },
        // {
        //     id: 11,
        //     title: "Heavy Coin Handling",
        //     modules: [
        //         {
        //             type: "video",
        //             videoId: "312438618"
        //         },
        //         {
        //             type: "text",
        //             content: `
        //     <p>SecureCash is committed to a safe work environment and as such expect that all staff are trained and adhere to safe work procedures.</p>
        //     <p>As an employer we are committed to ensure that we provide the minimum standards to comply with the legislative requirements of Division 2.9 of the Regulations and the Australian Code of Practice - Manual Handling.</p>
        //     <p>In particular, there are standards that relate to cash in transit.</p>
        //     <p>These are to ensure that banking couriers use the correct posture and position in a vehicle environment, document and train employees with the safe lifting loads and ensure that trolleys are used to carry any loads above the specified weight, and to ensure banking couriers receive manual handling training.</p>
        //     <p>Below is an example of how a banking courier is to pickup heavy coin:</p>
        //   `
        //         },
        //         {
        //             type: "image",
        //             src: "https://www.securecash.com.au/content/images/induction/heavy-coin-handling.png",
        //             alt: "Heavy Coin Handling"
        //         },
        //         {
        //             type: "text",
        //             content: `
        //     <p><span style="text-decoration:underline;"><strong>NEVER</strong></span> use your back to pickup heavy coin, always use your legs and bend your knees.</p>
        //     <p>The nature of the industry which is cash in transit means that banking couriers are often exposed to large and heavy amount of coins to collect.</p>
        //     <p>There are guidelines in place to ensure that banking couriers are lifting and handling these collections in the correct manner using the correct equipment. </p>
        //     <p>As a general rule, a carry bag is to be used when transporting collections from the client’s premises to the banking couriers vehicle. </p>
        //     <p>A carry bag is to be used for collections weighing less than 7 kilos in total. For instance, if a client has 10 bags to collect, the total weight of the 10 bags must not exceed 7 kilos. If the total weight exceeds 7 kilos, then a wheeled carry bag and/or trolley must be used. </p>
        //     <p>Banking couriers should never lift a full carry bag into their car.</p>
        //     <p>Some clients will always have heavy coin to collect. Notes will be made on your run to highlight these existing clients, but if a new client has this type of collection, the banking courier must make this known to the area manager so that your run can be updated.</p>
        //     <p>The banking courier also has a duty to inform the area manager that a client is preparing bags too heavy for collection so that the client can be informed if necessary.</p>
        //     <p>In the event of a collection occurring at a known heavy coin client, the banking courier is expected to use their discretion and choose the most appropriate equipment to facilitate the job.</p>
        //   `
        //         }
        //     ],
        //     quiz: {
        //         questions: [
        //             {
        //                 id: "q11_1",
        //                 text: "What should you use to transport money from the client to your vehicle?",
        //                 options: [
        //                     "Shopping trolley.",
        //                     "A shopping bag.",
        //                     "A carry bag."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q11_2",
        //                 text: "What is the maximum amount of weight before a trolley is required?",
        //                 options: [
        //                     "10 kilos",
        //                     "As much as you can hold.",
        //                     "7 kilos"
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q11_3",
        //                 text: "How are satchels to be taken from your bag and placed into the vehicles lock box?",
        //                 options: [
        //                     "Open your bag and tip them all in at once.",
        //                     "One at a time.",
        //                     "A handful at a time."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q11_4",
        //                 text: "What do you do if a client has a large amount of coin to be banked?",
        //                 options: [
        //                     "Inform your manager so notes can be recorded and if necessary action taken.",
        //                     "Use a larger bag.",
        //                     "Tell them to stop."
        //                 ],
        //                 correctIndex: 0
        //             },
        //             {
        //                 id: "q11_5",
        //                 text: "Using the picture as an example, how should heavy coin be picked up?",
        //                 options: [
        //                     "Lift with your back.",
        //                     "However you are comfortable.",
        //                     "Bend your knees keep your back straight."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q11_6",
        //                 text: "What part of your body must you never use to pick up heavy coin?",
        //                 options: [
        //                     "Your head.",
        //                     "Your feet.",
        //                     "Your back."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q11_7",
        //                 text: "What part of your body should you use to pick up heavy coin?",
        //                 options: [
        //                     "Your legs and bend your knees.",
        //                     "Your arms.",
        //                     "Your back and tilt your head back."
        //                 ],
        //                 correctIndex: 0
        //             }
        //         ]
        //     }
        // },
        // {
        //     id: 12,
        //     title: "Harassment",
        //     modules: [
        //         {
        //             type: "video",
        //             videoId: "312438563"
        //         },
        //         {
        //             type: "text",
        //             content: `
        //     <p>SecureCash considers harassment of any form to be unacceptable behaviour which will not be tolerated. Sexual harassment is also unlawful.</p>
        //     <p>SecureCash is therefore committed to action which ensures the absence of harassment in the workplace. Appropriate disciplinary action will be taken against any individual engaging in such conduct.</p>
        //     <p>Harassment involves any unwanted and unsolicited behaviour that torments someone else which the person at whom it is directed finds offensive, degrading or unpleasant.</p>
        //     <p>Sexual harassment is any form of unwanted sexual attention. Sexual harassment can be a single incident or unwanted attention such as touching or other physical contact, remarks with sexual connotations, smutty jokes, and request for sexual favours, leering or the display of offensive material.</p>
        //     <p>Some incidents of unwanted attention do not constitute sexual harassment until they are repeated</p>
        //     <p>An example is as follows:</p>
        //     <p>Continuous invitations to see that person outside of working hours after their intentions have been made clear that they do not want to associate with that person.</p>
        //     <p>Deliberate and continuous compliments in the nature of one’s appearance.</p>
        //     <p>Sexual harassment is against the law.</p>
        //     <p>A client must never be touched. The banking courier must be aware of any intentional contact with the client as it can be easily misconstrued that a friendly pat on the back is a sexual advance.</p>
        //     <p>If a client touches a banking courier and the banking courier is uncomfortable about the situation, then the banking courier is to notify the area manager immediately after they have left the clients premises.</p>
        //     <p>No banking courier is permitted to have a sexual relationship with a client.</p>
        //     <p>Any banking courier who experiences difficulties or are aware of incidents relating to harassment of any form and are not satisfied of the outcome after explaining the situation to their manager must contact the General Manager of SecureCash and report the incident.</p>
        //   `
        //         }
        //     ],
        //     quiz: {
        //         questions: [
        //             {
        //                 id: "q12_1",
        //                 text: "Is any form of harassment acceptable?",
        //                 options: [
        //                     "Yes, when it is done with good intentions.",
        //                     "Depends on the circumstances.",
        //                     "No."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q12_2",
        //                 text: "What is an example of harassment?",
        //                 options: [
        //                     "Any unwanted and unsolicited behaviour that torments someone else which is offensive, degrading or unpleasant.",
        //                     "A joke that has been said too many times and is getting boring.",
        //                     "A joke that excludes the customer."
        //                 ],
        //                 correctIndex: 0
        //             },
        //             {
        //                 id: "q12_3",
        //                 text: "What is an example of sexual harassment?",
        //                 options: [
        //                     "If you repeatedly ask for sex after already being told no.",
        //                     "Touching or other physical contact, remarks with sexual connotations, smutty jokes, and requests for sexual favours, leering or the display of offensive material.",
        //                     "Asking someone out for a date."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q12_4",
        //                 text: "Who should you report harassment to?",
        //                 options: [
        //                     "It depends on the circumstances, ask your friends for advise.",
        //                     "Your manager.",
        //                     "A fellow employee."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q12_5",
        //                 text: "Are you allowed to touch a client?",
        //                 options: [
        //                     "Yes, if the client doesn’t mind.",
        //                     "Yes, if you know the client.",
        //                     "No."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q12_6",
        //                 text: "Is sexual harassment against the law?",
        //                 options: [
        //                     "Depends on the circumstances.",
        //                     "No.",
        //                     "Yes."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q12_7",
        //                 text: "Are you permitted to have a sexual relationship with a client?",
        //                 options: [
        //                     "Yes, but only if you keep it secret.",
        //                     "Yes.",
        //                     "No, it is our policy to keep relationships strictly professional."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q12_8",
        //                 text: "Do you understand this harassment policy?",
        //                 options: [
        //                     "Yes, I fully understand.",
        //                     "No, I will need to speak with someone about this further.",
        //                     "I don’t think this applies to me."
        //                 ],
        //                 correctIndex: 0
        //             }
        //         ]
        //     }
        // },
        // {
        //     id: 13,
        //     title: "Procedures For Ordering Change",
        //     modules: [
        //         {
        //             type: "text",
        //             content: `
        //     <p>SecureCash offers a change order service to all it’s clients, there are several different ways in which these are provided;</p>
        //     <p>The client pre-arranges to have a change order collected by the banking courier at a bank of their choice, the banking courier simply goes to the bank first & collects change then delivers it to the client.</p>
        //     <p>or</p>
        //     <p>The client may give the banking courier funds upon their arrival to collect the clients banking, the banking courier is then to go to the bank, change the order into the required denominations and return it back to the client.</p>
        //     <p>or</p>
        //     <p>The client transfers the money for the change order into a nominated bank account. The banking courier withdraws the change order from the bank prior and delivers it to the client.</p>
        //     <p>or</p>
        //     <p>You, the banking courier, fund the money for the change order and have the amount requested made up prior to attending the clients premises. The banking courier delivers the change order and then <span style="text-decoration:underline;">MUST</span> get that same dollar amount in cash notes back from the customer.</p>
        //     <p>Regardless of the method used above, the client is encouraged to order the change prior from either of the two following methods;</p>
        //     <p>Online Services: <a href="https://www.securecash.com.au/onlineservices/">www.securecash.com.au/onlineservices</a><br>Telephone Services: <a href="tel:1300732873">1300 SECURE</a></p>
        //     <p>However the banking courier must be prepared to perform a change order for a client that has not been ordered prior.</p>
        //     <p>If the client does order the change via online/telephone services, it will be forwarded to you prior to the commencement of your shift. The client is encouraged to order change using online/telephone services so that you are able to plan your day better and to make sure the funds are available with the bank, and if at all possible fund the change order prior to arrival to save you time in advance.</p>
        //     <p>All change orders collected from the bank must be sealed in a a tamper proof serial numbered satchel either provided by the bank (usually one of the banks own EBD satchels), or a satchel provided by your manager.</p>
        //     <p>Remember, never handle raw cash, this includes large return change orders!</p>
        //     <p>(Obviously common sense is required, if the client hands you $200 in $50 notes that is easily counted for verification, then there is no need to place in a tamper evident satchel, the above is referring to large amounts that would take time to count and verify. i.e. $500 to $1000 that is made up of mixed denominations of coins and notes).</p>
        //     <p>Place the change order in the tamper evident bag and make sure it is sealed in front of the bank teller, make sure the bank teller writes down the serial number of the satchel in case there is a discrepancy.</p>
        //     <p>Upon delivery of the change to client, the client will check that bag is sealed then check that funds are correct when they are satisfied that all is correct they must sign your copy of the "White Docket" as confirmation of delivery.</p>
        //     <h2>What Are Change Orders?</h2>
        //   `
        //         },
        //         {
        //             type: "video",
        //             videoId: "312434020"
        //         }
        //     ],
        //     quiz: {
        //         questions: [
        //             {
        //                 id: "q13_1",
        //                 text: "What are the three ways funds for a change order can be given",
        //                 options: [
        //                     "We pick up funds on one collection day and return the change on the next collection OR the client EFT’s the funds into the drivers account OR SecureCash EFT’s the funds into the drivers account.",
        //                     "The client EFT’s the funds to SecureCash OR we attend the client, collect their funds, go to the bank and then return OR we use our funds and are reimbursed upon delivery, up to $1000 only.",
        //                     "The only way to receive funds for change orders is for the client to make the driver a signatory of their bank account."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q13_2",
        //                 text: "What is the right website for a client to order change?",
        //                 options: [
        //                     "https://www.securecash.com/onlineservices",
        //                     "www.securecash.com.au",
        //                     "customers@securecash.com.au"
        //                 ],
        //                 correctIndex: 0
        //             },
        //             {
        //                 id: "q13_3",
        //                 text: "What is the telephone number for a client to order change?",
        //                 options: [
        //                     "The client has to order the change from his bank.",
        //                     "1300 SECURE / 1300 732 873",
        //                     "1300 364 569"
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q13_4",
        //                 text: "Should you get change for a client that has not ordered it online?",
        //                 options: [
        //                     "Yes, if the client asks nicely.",
        //                     "Yes, if you have time.",
        //                     "Not unless prior arrangements have been made."
        //                 ],
        //                 correctIndex: 2
        //             },
        //             {
        //                 id: "q13_5",
        //                 text: "What do you need to ensure with the change order at the bank?",
        //                 options: [
        //                     "That the amount is correct.",
        //                     "That it is sealed in a tamper evident sealed bag.",
        //                     "That it is real money."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q13_6",
        //                 text: "Should you handle raw change order money?",
        //                 options: [
        //                     "No, it’s not safe to do so.",
        //                     "Yes, if the client agrees.",
        //                     "Yes, if you feel comfortable to do so."
        //                 ],
        //                 correctIndex: 0
        //             },
        //             {
        //                 id: "q13_7",
        //                 text: "When will you be notified that a client requires change?",
        //                 options: [
        //                     "Anytime before we arrive.",
        //                     "The clients are told to give us two business days notice.",
        //                     "Anytime the day before."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q13_8",
        //                 text: "What must you have signed when delivering the change to the client?",
        //                 options: [
        //                     "Any section of the docket book.",
        //                     "A bank deposit slip.",
        //                     "The change order section of the docket."
        //                 ],
        //                 correctIndex: 2
        //             }
        //         ]
        //     }
        // },
        // {
        //     id: 14,
        //     title: "How To Introduce Yourself To A Customer",
        //     modules: [
        //         {
        //             type: "video",
        //             videoId: "312434043"
        //         }
        //     ],
        //     quiz: {
        //         questions: [
        //             {
        //                 id: "q14_1",
        //                 text: "How should you introduce yourself to a client?",
        //                 options: [
        //                     "Try and greet the person by name if known, or at least acknowledge them with a good morning or good afternoon.",
        //                     "Just nod your head and give them a wink.",
        //                     "Say nothing and hold up your ID for the client to see."
        //                 ],
        //                 correctIndex: 0
        //             },
        //             {
        //                 id: "q14_2",
        //                 text: "Should you try to know the name of the client you are speaking to?",
        //                 options: [
        //                     "The client’s name is only important if it’s not a one-off collection.",
        //                     "No, that’s not important.",
        //                     "Yes, it is polite to try and learn the name of the client you are dealing with."
        //                 ],
        //                 correctIndex: 2
        //             }
        //         ]
        //     }
        // },
        // {
        //     id: 15,
        //     title: "eDocket App",
        //     modules: [
        //         {
        //             type: "text",
        //             content: `
        //     <p>This part of the induction will walk you through on how to install and use the SecureCash eDocket app.</p>
        //     <p>Before you start watching the videos please download the appropriate setup manual PDF:</p>
        //     <p><strong>Android:</strong> <a href="https://www.securecash.com.au/content/uploads/App-Setup-Android.pdf" target="_blank">Click to open or download</a></p>
        //     <p><strong>iPhone:</strong> <a href="https://www.securecash.com.au/content/uploads/App-Setup-iPhone.pdf" target="_blank">Click to open or download</a></p>
        //     <p><strong>How to install the eDocket app on your phone:</strong></p>
        //   `
        //         },
        //         {
        //             type: "video",
        //             videoId: "312438527"
        //         },
        //         {
        //             type: "text",
        //             content: `<h4>How to record a collection or delivery:</h4>`
        //         },
        //         {
        //             type: "video",
        //             videoId: "312438471"
        //         },
        //         {
        //             type: "text",
        //             content: `<h4>How to record a deposit:</h4>`
        //         },
        //         {
        //             type: "video",
        //             videoId: "312438501"
        //         }
        //     ],
        //     quiz: {
        //         questions: [
        //             {
        //                 id: "q15_1",
        //                 text: "What's the first thing you'll need to do before downloading the app onto your phone?",
        //                 options: [
        //                     "Download a barcode scanner from the app store.",
        //                     "Check that you have permission to do so.",
        //                     "Watch the whole video."
        //                 ],
        //                 correctIndex: 0
        //             },
        //             {
        //                 id: "q15_2",
        //                 text: "Does location services need to be switched on or off?",
        //                 options: [
        //                     "OFF",
        //                     "ON, with maximum accuracy level.",
        //                     "It doesn't matter as long as you type in the correct location when you collect the money."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q15_3",
        //                 text: "When first arriving at a client for a collection what is the tab that you click on?",
        //                 options: [
        //                     "Collection / Delivery",
        //                     "Deposit",
        //                     "Verify Driver"
        //                 ],
        //                 correctIndex: 0
        //             },
        //             {
        //                 id: "q15_4",
        //                 text: "Who types the bag and cash details into the eDocket?",
        //                 options: [
        //                     "The client inputs the details.",
        //                     "The driver inputs the details.",
        //                     "You should take it in turns for fairness sake."
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q15_5",
        //                 text: "Who signs the eDocket when a change order is delivered?",
        //                 options: [
        //                     "The bank",
        //                     "The client",
        //                     "The driver"
        //                 ],
        //                 correctIndex: 1
        //             },
        //             {
        //                 id: "q15_6",
        //                 text: "Are you aware of the support number on the app to ring if you have any problems?",
        //                 options: [
        //                     "Yes it's the support tab on the app.",
        //                     "No I haven't seen anything.",
        //                     "I just ring the SecureCash office number."
        //                 ],
        //                 correctIndex: 0
        //             }
        //         ]
        //     }
        // }
    ]
};