import Accordion from '../components/Accordion'

function AccordionPage() {
    const items = [
        {
            id: 'q123-098',
            label: 'Can I use React on a project ?',
            content: 'You can use React on any project you want. You can use React on any project you want. You can use React on any project you want. You can use React on any project you want. '
        },
        {
            id: 'q123-ghf',
            label: 'Can I use Javascript on a project ?',
            content: 'You can use Javascript on any project you want. You can use Javascript on any project you want. You can use Javascript on any project you want. You can use Javascript on any project you want. '
        },
        {
            id: 'q123-qwe',
            label: 'Can I use css on a project ?',
            content: 'You can use css on any project you want. You can use css on any project you want. You can use css on any project you want. You can use css on any project you want. You can use css on any project you want. '
        },
    ];

    return <Accordion items={items}/>
}

export default AccordionPage;