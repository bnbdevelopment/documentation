import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  logo: string;
  description: ReactNode;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Irodalomerettsegi API',
    logo: 'https://irodalomerettsegi.hu/favicon.ico',
    description: (
      <>
        REST API az irodalom érettségi tételek, fogalmak és memoriterek kezeléséhez. 
        Teljes dokumentáció és példakódok.
      </>
    ),
    link: '/docs/irodalomerettsegi/hello'
  },
  {
    title: 'BNBDEVELOPMENT',
    logo: 'https://avatars.githubusercontent.com/u/203906907?s=200&v=4', 
    description: (
      <>
        Látogasd meg weboldalunkat és ismerj meg minket közelebbről! Nézd meg projektjeinket
        és vedd fel velünk a kapcsolatot.
      </>
    ),
    link: 'https://bnbdevelopment.hu'
  },
  {
    title: 'GitHub',
    logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    description: (
      <>
        Keresd fel GitHub profilunkat! Itt megtalálod nyílt forráskódú projektjeinket
        és közreműködhetsz fejlesztésükben.
      </>
    ),
    link: 'https://github.com/bnbdevelopment'
  },
];

function Feature({title, logo, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <a href={link} className={styles.featureLink}>
        <div className="text--center">
          <img 
            src={logo} 
            className={styles.featureLogo} 
            alt={title}
            style={{width: '50px', height: '50px', objectFit: 'contain'}} 
          />
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </a>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
