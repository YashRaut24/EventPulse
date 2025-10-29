import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error, r2_score
import matplotlib.pyplot as plt

df = pd.read_csv('social_media_engagement1.csv')

df['hour'] = pd.to_datetime(df['post_time']).dt.hour
le_platform = LabelEncoder()
le_post_type = LabelEncoder()
le_day = LabelEncoder()
le_sentiment = LabelEncoder()

df['platform_enc'] = le_platform.fit_transform(df['platform'])
df['post_type_enc'] = le_post_type.fit_transform(df['post_type'])
df['post_day_enc'] = le_day.fit_transform(df['post_day'])
df['sentiment_enc'] = le_sentiment.fit_transform(df['sentiment_score'])

X = df[['platform_enc', 'post_type_enc', 'hour', 'post_day_enc', 'sentiment_enc']]
y_likes = df['likes']
y_comments = df['comments']
y_shares = df['shares']

X_train, X_test, y_likes_train, y_likes_test = train_test_split(X, y_likes, test_size=0.2, random_state=42)
_, _, y_comments_train, y_comments_test = train_test_split(X, y_comments, test_size=0.2, random_state=42)
_, _, y_shares_train, y_shares_test = train_test_split(X, y_shares, test_size=0.2, random_state=42)

model_likes = RandomForestRegressor(n_estimators=100, random_state=42)
model_comments = RandomForestRegressor(n_estimators=100, random_state=42)
model_shares = RandomForestRegressor(n_estimators=100, random_state=42)

model_likes.fit(X_train, y_likes_train)
model_comments.fit(X_train, y_comments_train)
model_shares.fit(X_train, y_shares_train)

pred_likes = model_likes.predict(X_test)
pred_comments = model_comments.predict(X_test)
pred_shares = model_shares.predict(X_test)

print(
    f"Model Accuracy - Likes: R²={r2_score(y_likes_test, pred_likes):.2f}, Comments: R²={r2_score(y_comments_test, pred_comments):.2f}, Shares: R²={r2_score(y_shares_test, pred_shares):.2f}")

fig, axes = plt.subplots(2, 2, figsize=(12, 10))

axes[0, 0].scatter(y_likes_test, pred_likes, alpha=0.6)
axes[0, 0].plot([y_likes_test.min(), y_likes_test.max()], [y_likes_test.min(), y_likes_test.max()], 'r--')
axes[0, 0].set_xlabel('Actual Likes')
axes[0, 0].set_ylabel('Predicted Likes')
axes[0, 0].set_title('Likes Prediction')

axes[0, 1].scatter(y_comments_test, pred_comments, alpha=0.6)
axes[0, 1].plot([y_comments_test.min(), y_comments_test.max()], [y_comments_test.min(), y_comments_test.max()], 'r--')
axes[0, 1].set_xlabel('Actual Comments')
axes[0, 1].set_ylabel('Predicted Comments')
axes[0, 1].set_title('Comments Prediction')

axes[1, 0].scatter(y_shares_test, pred_shares, alpha=0.6)
axes[1, 0].plot([y_shares_test.min(), y_shares_test.max()], [y_shares_test.min(), y_shares_test.max()], 'r--')
axes[1, 0].set_xlabel('Actual Shares')
axes[1, 0].set_ylabel('Predicted Shares')
axes[1, 0].set_title('Shares Prediction')

platform_avg = df.groupby('platform')[['likes', 'comments', 'shares']].mean()
platform_avg.plot(kind='bar', ax=axes[1, 1])
axes[1, 1].set_title('Average Engagement by Platform')
axes[1, 1].set_xlabel('Platform')
axes[1, 1].set_ylabel('Count')
axes[1, 1].legend(['Likes', 'Comments', 'Shares'])

plt.tight_layout()
plt.show()

print("\n=== Social Media Engagement Predictor ===")
print("\nAvailable Options:")
print("Platforms:", ', '.join(le_platform.classes_))
print("Post Types:", ', '.join(le_post_type.classes_))
print("Days:", ', '.join(le_day.classes_))
print("Sentiments:", ', '.join(le_sentiment.classes_))

while True:
    print("\n--- Enter Post Details ---")

    while True:
        platform = input("Platform: ").strip().capitalize()
        if platform in le_platform.classes_:
            break
        print(f"Invalid! Choose from: {', '.join(le_platform.classes_)}")

    while True:
        post_type = input("Post Type: ").strip().lower()
        if post_type in le_post_type.classes_:
            break
        print(f"Invalid! Choose from: {', '.join(le_post_type.classes_)}")

    while True:
        try:
            hour = int(input("Hour (0-23): "))
            if 0 <= hour <= 23:
                break
            print("Hour must be between 0 and 23")
        except ValueError:
            print("Please enter a valid number")

    while True:
        post_day = input("Day: ").strip().capitalize()
        if post_day in le_day.classes_:
            break
        print(f"Invalid! Choose from: {', '.join(le_day.classes_)}")

    while True:
        sentiment = input("Sentiment: ").strip().lower()
        if sentiment in le_sentiment.classes_:
            break
        print(f"Invalid! Choose from: {', '.join(le_sentiment.classes_)}")

    new_post = pd.DataFrame({
        'platform_enc': [le_platform.transform([platform])[0]],
        'post_type_enc': [le_post_type.transform([post_type])[0]],
        'hour': [hour],
        'post_day_enc': [le_day.transform([post_day])[0]],
        'sentiment_enc': [le_sentiment.transform([sentiment])[0]]
    })

    pred_l = model_likes.predict(new_post)[0]
    pred_c = model_comments.predict(new_post)[0]
    pred_s = model_shares.predict(new_post)[0]

    print(f"\n✓ Predicted Engagement for {platform} {post_type} on {post_day} at {hour}:00 ({sentiment}):")
    print(f"  Likes: {pred_l:.0f}")
    print(f"  Comments: {pred_c:.0f}")
    print(f"  Shares: {pred_s:.0f}")

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

    input_labels = ['Platform', 'Post Type', 'Hour', 'Day', 'Sentiment']
    input_values = [platform, post_type, str(hour), post_day, sentiment]
    ax1.axis('off')
    ax1.text(0.5, 0.9, 'Your Input', ha='center', fontsize=16, fontweight='bold', transform=ax1.transAxes)
    for i, (label, value) in enumerate(zip(input_labels, input_values)):
        y_pos = 0.75 - i * 0.15
        ax1.text(0.3, y_pos, f'{label}:', ha='right', fontsize=12, fontweight='bold', transform=ax1.transAxes)
        ax1.text(0.35, y_pos, value, ha='left', fontsize=12, transform=ax1.transAxes)

    metrics = ['Likes', 'Comments', 'Shares']
    values = [pred_l, pred_c, pred_s]
    colors = ['#3b5998', '#E1306C', '#1DA1F2']
    ax2.bar(metrics, values, color=colors)
    ax2.set_title('Predicted Engagement', fontsize=14, fontweight='bold')
    ax2.set_ylabel('Count')
    for i, v in enumerate(values):
        ax2.text(i, v + max(values) * 0.02, f'{v:.0f}', ha='center', fontweight='bold')

    plt.tight_layout()
    plt.show()

    cont = input("\nPredict another? (y/n): ").strip().lower()
    if cont != 'y':
        break

print("\nThank you!")