# Generated by Django 5.1.1 on 2024-12-09 00:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0002_alter_posts_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='pins',
            name='expire',
            field=models.DateTimeField(null=True),
        ),
    ]
