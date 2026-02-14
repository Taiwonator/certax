import React from 'react';
import './AboutAliceSection.scss';
import Subheader from '../../components/Subheader/Subheader';
import Content from '../../components/Content/Content';

const AboutAliceSection = React.forwardRef((props, ref) => {
    return (
        <section ref={ref} className='about-alice-section-container' aria-label="Meet Your Accountant - Alice Taiwo">
            <Subheader text={props.data.headertext} color={props.colors.blue} underline={false} />
            <div className='about-alice-content-wrapper'>
                <div className='about-alice-main-content'>
                    <div className='about-alice-text-content'>
                        <h2 style={{ color: props.colors.yellow }}>{props.data.name}</h2>
                        <Content
                            headertext=""
                            paratext={props.data.paratext}
                            headercolor={props.colors.blue}
                            paracolor={props.colors.grey}
                            align='left'
                            text={props.data.text}
                            noUnderline={true}
                        />
                    </div>
                    <div className='about-alice-specialisms'>
                        <h3 style={{ color: props.colors.blue }}>Specialisms</h3>
                        <ul>
                            {props.data.specialisms.map((specialism, index) => (
                                <li key={index} style={{ color: props.colors.grey }}>
                                    <span style={{ color: props.colors.yellow }}>•</span> {specialism}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='about-alice-contact-info'>
                    <h3 style={{ color: props.colors.blue }}>Get in Touch</h3>
                    <div className='contact-details'>
                        <p style={{ color: props.colors.grey }}>
                            <strong style={{ color: props.colors.yellow }}>Phone:</strong> {props.data.contact.phone}
                        </p>
                        <p style={{ color: props.colors.grey }}>
                            <strong style={{ color: props.colors.yellow }}>Email:</strong> {props.data.contact.email}
                        </p>
                        <p style={{ color: props.colors.grey }}>
                            <strong style={{ color: props.colors.yellow }}>Address:</strong> {props.data.contact.address}
                        </p>
                        <p style={{ color: props.colors.grey }}>
                            <strong style={{ color: props.colors.yellow }}>Hours:</strong> {props.data.contact.hours}
                        </p>
                        <p style={{ color: props.colors.grey, fontSize: '14px', marginTop: '1em' }}>
                            Our fees are calculated on a fixed fee basis, so you know upfront the cost of the services required with no hidden charges. Contact us for your free initial consultation.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default AboutAliceSection;

