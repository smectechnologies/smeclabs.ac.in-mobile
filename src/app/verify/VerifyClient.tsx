'use client';

import { Icon } from '@iconify/react';
import SmecnewLayout from '../components/smecnew/SmecnewLayout';
import styles from './verify.module.css';

export default function VerifyClient() {
  return (
    <SmecnewLayout>
      <div className={styles.wrapper}>
        {/* Floating orbs */}
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />

        <div className={styles.card}>
          {/* Badge */}
          <span className={styles.badge}>
            <Icon icon="mdi:shield-check" width={14} />
            Trusted &amp; Secure
          </span>

          {/* Logo */}
          <div className={styles.logoWrap}>
            <img
              src="/img/smecsqure.webp"
              alt="SMECSure"
              className={styles.logo}
            />
          </div>

          {/* Headline */}
          <h1 className={styles.title}>Certificate Verification</h1>
          <p className={styles.subtitle}>
            Instantly verify the authenticity of any SMEClabs certificate.
            Our secure portal ensures every credential is genuine and tamper-proof.
          </p>

          {/* Trust points */}
          <div className={styles.trustRow}>
            <div className={styles.trustItem}>
              <Icon icon="mdi:lightning-bolt" className={styles.trustIcon} />
              <span>Instant Results</span>
            </div>
            <div className={styles.trustItem}>
              <Icon icon="mdi:lock-check" className={styles.trustIcon} />
              <span>Tamper-Proof</span>
            </div>
            <div className={styles.trustItem}>
              <Icon icon="mdi:earth" className={styles.trustIcon} />
              <span>Globally Recognized</span>
            </div>
          </div>

          {/* CTA */}
          <a
            href="https://apply.smeclabs.com/certificate-verification/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            <Icon icon="mdi:certificate-outline" width={20} />
            <span>Certificate Verification Portal</span>
            <Icon icon="mdi:arrow-right" className={styles.ctaArrow} width={18} />
          </a>

          <p className={styles.note}>
            <Icon icon="mdi:information-outline" width={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            Employers and institutions can verify certificates 24/7 — no login required.
          </p>
        </div>
      </div>
    </SmecnewLayout>
  );
}
