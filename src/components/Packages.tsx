"use client";

import { packages } from '@/data/packages';
import styles from './Packages.module.css';

const Packages = () => {
  return (
    <div className={styles.packagesContainer}>
      {packages.map((pkg) => (
        <div key={pkg.title} className={styles.packageCard}>
          <h2 className={styles.packageTitle}>{pkg.title}</h2>
          <p className={styles.packageDescription}>{pkg.description}</p>
          <p className={styles.packageDetails}>
            {pkg.nights} Nights / {pkg.days} Days
          </p>
          <p className={styles.packageDetails}>Min Pax: {pkg.minPax}</p>
          <p className={styles.packagePrice}>
            Normal Price: {pkg.normalPrice}
          </p>
          <p className={styles.packagePrice}>
            Discount Price: {pkg.discountPrice}
          </p>
          <ul className={styles.packageInclusions}>
            {pkg.inclusions.map((inclusion, index) => (
              <li key={index}>{inclusion}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Packages;